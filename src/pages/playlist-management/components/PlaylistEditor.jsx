import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PlaylistEditor = ({ 
  playlist, 
  onSave, 
  onClose, 
  onTrackReorder, 
  onTrackRemove 
}) => {
  const [editedPlaylist, setEditedPlaylist] = useState(playlist);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [draggedTrack, setDraggedTrack] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setEditedPlaylist(playlist);
  }, [playlist]);

  const handleSave = () => {
    onSave(editedPlaylist);
  };

  const handleTrackSelect = (trackId, isSelected) => {
    if (isSelected) {
      setSelectedTracks([...selectedTracks, trackId]);
    } else {
      setSelectedTracks(selectedTracks?.filter(id => id !== trackId));
    }
  };

  const handleSelectAll = () => {
    if (selectedTracks?.length === editedPlaylist?.tracks?.length) {
      setSelectedTracks([]);
    } else {
      setSelectedTracks(editedPlaylist?.tracks?.map(track => track?.id));
    }
  };

  const handleRemoveSelected = () => {
    const updatedTracks = editedPlaylist?.tracks?.filter(
      track => !selectedTracks?.includes(track?.id)
    );
    setEditedPlaylist({
      ...editedPlaylist,
      tracks: updatedTracks,
      trackCount: updatedTracks?.length,
      duration: updatedTracks?.reduce((total, track) => total + track?.duration, 0)
    });
    setSelectedTracks([]);
    onTrackRemove(selectedTracks);
  };

  const handleDragStart = (e, track) => {
    setDraggedTrack(track);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetTrack) => {
    e?.preventDefault();
    if (!draggedTrack || draggedTrack?.id === targetTrack?.id) return;

    const tracks = [...editedPlaylist?.tracks];
    const draggedIndex = tracks?.findIndex(t => t?.id === draggedTrack?.id);
    const targetIndex = tracks?.findIndex(t => t?.id === targetTrack?.id);

    tracks?.splice(draggedIndex, 1);
    tracks?.splice(targetIndex, 0, draggedTrack);

    setEditedPlaylist({
      ...editedPlaylist,
      tracks
    });
    setDraggedTrack(null);
    onTrackReorder(draggedTrack?.id, targetIndex);
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  const filteredTracks = editedPlaylist?.tracks?.filter(track =>
    track?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    track?.artist?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    track?.album?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Music" size={24} className="text-primary-foreground" />
            </div>
            <div>
              <Input
                type="text"
                value={editedPlaylist?.name}
                onChange={(e) => setEditedPlaylist({
                  ...editedPlaylist,
                  name: e?.target?.value
                })}
                className="text-xl font-bold bg-transparent border-none p-0 focus:ring-0"
                placeholder="Playlist name"
              />
              <p className="text-sm text-muted-foreground">
                {editedPlaylist?.trackCount} tracks • {Math.floor(editedPlaylist?.duration / 60)}m
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="default" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              iconName={selectedTracks?.length === editedPlaylist?.tracks?.length ? "CheckSquare" : "Square"}
              iconPosition="left"
              iconSize={16}
            >
              {selectedTracks?.length === editedPlaylist?.tracks?.length ? 'Deselect All' : 'Select All'}
            </Button>
            {selectedTracks?.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleRemoveSelected}
                iconName="Trash2"
                iconPosition="left"
                iconSize={16}
              >
                Remove ({selectedTracks?.length})
              </Button>
            )}
          </div>
          <div className="w-64">
            <Input
              type="search"
              placeholder="Search tracks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Track List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-2">
            {filteredTracks?.map((track, index) => (
              <div
                key={track?.id}
                draggable
                onDragStart={(e) => handleDragStart(e, track)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, track)}
                className={`flex items-center space-x-4 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-move transition-colors ${
                  selectedTracks?.includes(track?.id) ? 'bg-primary/10 border-primary/30' : ''
                } ${draggedTrack?.id === track?.id ? 'opacity-50' : ''}`}
              >
                {/* Drag Handle */}
                <div className="flex items-center space-x-3">
                  <Icon name="GripVertical" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground w-8 text-right">
                    {index + 1}
                  </span>
                </div>

                {/* Selection Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedTracks?.includes(track?.id)}
                  onChange={(e) => handleTrackSelect(track?.id, e?.target?.checked)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />

                {/* Track Artwork */}
                <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={track?.artwork || track?.album?.images?.[0]?.url}
                    alt={track?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate">
                    {track?.name}
                  </h4>
                  <p className="text-sm text-muted-foreground truncate">
                    {track?.artist} • {track?.album}
                  </p>
                </div>

                {/* Track Duration */}
                <div className="text-sm text-muted-foreground">
                  {formatDuration(track?.duration)}
                </div>

                {/* Track Actions */}
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8"
                    iconName="Play"
                    iconSize={14}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleTrackSelect(track?.id, !selectedTracks?.includes(track?.id))}
                    className="w-8 h-8 text-destructive hover:text-destructive"
                    iconName="X"
                    iconSize={14}
                  />
                </div>
              </div>
            ))}

            {filteredTracks?.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No tracks found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? 'Try adjusting your search terms' : 'This playlist is empty'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {selectedTracks?.length > 0 && (
              <span>{selectedTracks?.length} tracks selected</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              iconSize={16}
            >
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Share"
              iconPosition="left"
              iconSize={16}
            >
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistEditor;