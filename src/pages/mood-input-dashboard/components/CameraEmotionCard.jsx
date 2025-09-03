import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CameraEmotionCard = ({ onEmotionDetected, isActive, onActivate }) => {
  const [cameraPermission, setCameraPermission] = useState('prompt');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  const mockEmotions = [
    { emotion: 'happy', confidence: 0.92, color: 'text-success' },
    { emotion: 'calm', confidence: 0.87, color: 'text-primary' },
    { emotion: 'excited', confidence: 0.94, color: 'text-accent' },
    { emotion: 'melancholy', confidence: 0.78, color: 'text-secondary' },
    { emotion: 'energetic', confidence: 0.89, color: 'text-warning' }
  ];

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices?.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      setStream(mediaStream);
      setCameraPermission('granted');
      if (videoRef?.current) {
        videoRef.current.srcObject = mediaStream;
      }
      onActivate();
    } catch (error) {
      setCameraPermission('denied');
      console.error('Camera access denied:', error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream?.getTracks()?.forEach(track => track?.stop());
      setStream(null);
    }
    setCameraPermission('prompt');
    setDetectedEmotion(null);
    setIsAnalyzing(false);
  };

  const startFacialRecognition = () => {
    setIsAnalyzing(true);
    
    // Mock emotion detection after 3 seconds
    setTimeout(() => {
      const randomEmotion = mockEmotions?.[Math.floor(Math.random() * mockEmotions?.length)];
      setDetectedEmotion(randomEmotion?.emotion);
      setConfidence(randomEmotion?.confidence);
      setIsAnalyzing(false);
      
      onEmotionDetected({
        method: 'camera',
        emotion: randomEmotion?.emotion,
        confidence: randomEmotion?.confidence,
        timestamp: new Date()
      });
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream?.getTracks()?.forEach(track => track?.stop());
      }
    };
  }, [stream]);

  const getPermissionIcon = () => {
    switch (cameraPermission) {
      case 'granted': return 'Camera';
      case 'denied': return 'CameraOff';
      default: return 'Camera';
    }
  };

  const getPermissionColor = () => {
    switch (cameraPermission) {
      case 'granted': return 'text-success';
      case 'denied': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 transition-all duration-300 ${
      isActive ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Camera" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Facial Recognition</h3>
            <p className="text-sm text-muted-foreground">Detect emotions through your camera</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon 
            name={getPermissionIcon()} 
            size={16} 
            className={getPermissionColor()} 
          />
          <span className={`text-xs font-medium ${getPermissionColor()}`}>
            {cameraPermission === 'granted' ? 'Connected' : 
             cameraPermission === 'denied' ? 'Denied' : 'Not Connected'}
          </span>
        </div>
      </div>

      {/* Camera Preview */}
      <div className="relative mb-4">
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          {cameraPermission === 'granted' ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <Icon name="Camera" size={48} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  {cameraPermission === 'denied' ?'Camera access denied' :'Camera preview will appear here'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Analysis Overlay */}
        {isAnalyzing && (
          <div className="absolute inset-0 bg-background/80 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground">Analyzing emotions...</p>
              <p className="text-xs text-muted-foreground mt-1">Please look at the camera</p>
            </div>
          </div>
        )}

        {/* Emotion Detection Result */}
        {detectedEmotion && !isAnalyzing && (
          <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm font-medium text-foreground capitalize">
                {detectedEmotion}
              </span>
              <span className="text-xs text-muted-foreground">
                {Math.round(confidence * 100)}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="space-y-3">
        {cameraPermission !== 'granted' ? (
          <Button
            variant="default"
            onClick={startCamera}
            iconName="Camera"
            iconPosition="left"
            className="w-full"
            disabled={cameraPermission === 'denied'}
          >
            {cameraPermission === 'denied' ? 'Camera Access Denied' : 'Enable Camera'}
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="default"
              onClick={startFacialRecognition}
              loading={isAnalyzing}
              iconName="Scan"
              iconPosition="left"
              className="flex-1"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Start Recognition'}
            </Button>
            <Button
              variant="outline"
              onClick={stopCamera}
              iconName="X"
              iconSize={16}
              className="px-3"
            />
          </div>
        )}

        {cameraPermission === 'denied' && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
              <div>
                <p className="text-sm font-medium text-error">Camera Permission Required</p>
                <p className="text-xs text-error/80 mt-1">
                  Please enable camera access in your browser settings to use facial recognition.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Real-time Feedback */}
      {detectedEmotion && (
        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Emotion Detected</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground capitalize">{detectedEmotion}</p>
              <p className="text-xs text-muted-foreground">
                Confidence: {Math.round(confidence * 100)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraEmotionCard;