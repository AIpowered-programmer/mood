import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportModal = ({ 
  playlist, 
  isOpen, 
  onClose, 
  onExport 
}) => {
  const [exportOptions, setExportOptions] = useState({
    spotify: true,
    shareLink: false,
    downloadM3U: false,
    downloadJSON: false,
    includeMetadata: true,
    publicPlaylist: false
  });
  const [shareSettings, setShareSettings] = useState({
    title: playlist?.name || '',
    description: `A mood-based playlist featuring ${playlist?.trackCount || 0} tracks`,
    allowComments: true,
    allowDownload: false
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState(null);

  if (!isOpen || !playlist) return null;

  const handleExportOptionChange = (option, value) => {
    setExportOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  const handleShareSettingChange = (setting, value) => {
    setShareSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportStatus(null);

    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const exportData = {
        playlist,
        options: exportOptions,
        shareSettings: exportOptions?.shareLink ? shareSettings : null
      };

      onExport(exportData);
      setExportStatus('success');
      
      // Auto close after success
      setTimeout(() => {
        onClose();
        setExportStatus(null);
      }, 2000);
    } catch (error) {
      setExportStatus('error');
    } finally {
      setIsExporting(false);
    }
  };

  const getExportMethods = () => [
    {
      id: 'spotify',
      name: 'Export to Spotify',
      description: 'Create a new playlist in your Spotify account',
      icon: 'Music',
      enabled: exportOptions?.spotify,
      premium: false
    },
    {
      id: 'shareLink',
      name: 'Generate Share Link',
      description: 'Create a shareable link for others to view',
      icon: 'Share',
      enabled: exportOptions?.shareLink,
      premium: false
    },
    {
      id: 'downloadM3U',
      name: 'Download M3U Playlist',
      description: 'Download as M3U playlist file',
      icon: 'Download',
      enabled: exportOptions?.downloadM3U,
      premium: false
    },
    {
      id: 'downloadJSON',
      name: 'Download JSON Data',
      description: 'Export playlist data as JSON file',
      icon: 'FileText',
      enabled: exportOptions?.downloadJSON,
      premium: true
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Share" size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Export Playlist</h2>
              <p className="text-sm text-muted-foreground">{playlist?.name}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Export Methods */}
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Export Methods</h3>
            <div className="space-y-3">
              {getExportMethods()?.map((method) => (
                <div
                  key={method?.id}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                    method?.enabled 
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      method?.enabled ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon name={method?.icon} size={18} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-foreground">{method?.name}</h4>
                        {method?.premium && (
                          <span className="px-2 py-1 text-xs bg-accent text-accent-foreground rounded-full">
                            Premium
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{method?.description}</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={method?.enabled}
                    onChange={(e) => handleExportOptionChange(method?.id, e?.target?.checked)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Share Link Settings */}
          {exportOptions?.shareLink && (
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border">
              <h4 className="font-medium text-foreground">Share Link Settings</h4>
              
              <Input
                label="Playlist Title"
                type="text"
                value={shareSettings?.title}
                onChange={(e) => handleShareSettingChange('title', e?.target?.value)}
                placeholder="Enter playlist title"
              />
              
              <Input
                label="Description"
                type="text"
                value={shareSettings?.description}
                onChange={(e) => handleShareSettingChange('description', e?.target?.value)}
                placeholder="Enter playlist description"
              />
              
              <div className="space-y-3">
                <Checkbox
                  label="Make playlist public"
                  checked={exportOptions?.publicPlaylist}
                  onChange={(e) => handleExportOptionChange('publicPlaylist', e?.target?.checked)}
                />
                <Checkbox
                  label="Allow comments"
                  checked={shareSettings?.allowComments}
                  onChange={(e) => handleShareSettingChange('allowComments', e?.target?.checked)}
                />
                <Checkbox
                  label="Allow downloads"
                  checked={shareSettings?.allowDownload}
                  onChange={(e) => handleShareSettingChange('allowDownload', e?.target?.checked)}
                />
              </div>
            </div>
          )}

          {/* Additional Options */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Additional Options</h4>
            <Checkbox
              label="Include track metadata"
              description="Export with detailed track information"
              checked={exportOptions?.includeMetadata}
              onChange={(e) => handleExportOptionChange('includeMetadata', e?.target?.checked)}
            />
          </div>

          {/* Export Status */}
          {exportStatus && (
            <div className={`p-4 rounded-lg border ${
              exportStatus === 'success' ?'border-success bg-success/10 text-success' :'border-destructive bg-destructive/10 text-destructive'
            }`}>
              <div className="flex items-center space-x-2">
                <Icon 
                  name={exportStatus === 'success' ? 'CheckCircle' : 'AlertCircle'} 
                  size={16} 
                />
                <span className="text-sm font-medium">
                  {exportStatus === 'success' ?'Export completed successfully!' :'Export failed. Please try again.'
                  }
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {playlist?.trackCount} tracks • {Math.floor(playlist?.duration / 60)}m total
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleExport}
              loading={isExporting}
              disabled={!Object.values(exportOptions)?.some(Boolean)}
              iconName="Share"
              iconPosition="left"
              iconSize={16}
            >
              {isExporting ? 'Exporting...' : 'Export Playlist'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;