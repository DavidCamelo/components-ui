import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from '../date-picker/DatePicker';
import { TimePicker } from '../time-picker/TimePicker';
import { Button } from '../button/Button';
import { Card } from '../card/Card';
import { Input } from '../input/Input';
import { Toggle } from '../toggle/Toggle';
import './schedule.css';

// --- Helper Functions ---
const timeToY = (time, hourHeight) => {
  const [hours, minutes] = time.split(':').map(Number);
  return (hours + minutes / 60) * hourHeight;
};

const yToTime = (y, hourHeight) => {
  const totalHours = y / hourHeight;
  const hours = Math.floor(totalHours);
  const minutes = Math.round(((totalHours - hours) * 60) / 15) * 15;

  if (minutes >= 60) {
      const newHours = hours + 1;
      const formattedHours = String(newHours % 24).padStart(2, '0');
      return `${formattedHours}:00`;
  }

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
};

const formatTimeForDisplay = (time) => {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 === 0 ? 12 : h % 12;
    return `${displayHour}:${minutes} ${ampm}`;
};

const getEventDuration = (startTime, endTime) => {
    const start = timeToY(startTime, 1);
    const end = timeToY(endTime, 1);
    return end - start;
};

// --- Hover Preview Component ---
const EventPreview = ({ event, position }) => {
    if (!event) return null;
    return (
        <div className="event-preview-card" style={{ top: position.y, left: position.x }}>
            <Card title={`${event.client} - ${event.title}`}>
                <div className="preview-grid">
                    <strong>Preview:</strong>
                    <div className="preview-image-container">
                        <img src={event.previewImage} alt="Preview" />
                    </div>
                    <strong>Start Time:</strong> <TimePicker name="startTime" value={event.startTime} size="small" readOnly />
                    <strong>End Time:</strong> <TimePicker name="endTime" value={event.endTime} size="small" readOnly />
                </div>
            </Card>
        </div>
    );
};

export const Schedule = ({ columns, events, onEventUpdate, onEventEdit, onEventCreate, onEventDelete, currentDate, onDateChange, allowCrossColumnDrag }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selection, setSelection] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const [draggingItem, setDraggingItem] = useState(null);
  const [resizingItem, setResizingItem] = useState(null);
  const [dropIndicator, setDropIndicator] = useState(null);
  const [shadowEvent, setShadowEvent] = useState(null);
  const [isCrossColumnDragAllowed, setIsCrossColumnDragAllowed] = useState(allowCrossColumnDrag);
  const [hoveredCell, setHoveredCell] = useState(null);

  const scheduleGridRef = useRef(null);
  const hourHeight = 80;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (scheduleGridRef.current) {
      const currentHour = new Date().getHours();
      const scrollToPosition = timeToY(`${currentHour > 0 ? currentHour - 1 : 0}:00`, hourHeight);
      scheduleGridRef.current.scrollTop = scrollToPosition;
    }
  }, []);

  const handleMouseDownOnColumn = (e, colId) => {
    if (e.target.closest('.schedule-event') || e.target.closest('.shadow-event')) return;
    setShadowEvent(null);
    const rect = scheduleGridRef.current.getBoundingClientRect();
    const startY = e.clientY - rect.top + scheduleGridRef.current.scrollTop - 40;
    setSelection({ columnId: colId, startY, currentY: startY });
  };

  const handleResizeStart = (e, event, edge) => {
    e.stopPropagation();
    e.preventDefault();
    setResizingItem({ event, edge });
  };

  const handleGlobalMouseMove = useCallback((e) => {
    if (selection) {
      const rect = scheduleGridRef.current.getBoundingClientRect();
      let currentY = e.clientY - rect.top + scheduleGridRef.current.scrollTop - 40;
      if (currentY < 0) {
        currentY = 0;
      }
      if (currentY > hourHeight * 24) {
        currentY = hourHeight * 24;
      }
      setSelection(prev => ({ ...prev, currentY }));
    }
    if (resizingItem) {
      const rect = scheduleGridRef.current.getBoundingClientRect();
      const currentY = e.clientY - rect.top + scheduleGridRef.current.scrollTop - 40;
      const newTime = yToTime(currentY, hourHeight);

      const updatedEvent = { ...resizingItem.event };

      if (resizingItem.edge === 'top') {
          if (timeToY(newTime, 1) >= 0 && timeToY(newTime, 1) < timeToY(updatedEvent.endTime, 1)) {
              updatedEvent.startTime = newTime;
              onEventUpdate(updatedEvent);
          }
      } else if (resizingItem.edge === 'bottom') {
          if (timeToY(newTime, 1) <= 24 && timeToY(newTime, 1) > timeToY(updatedEvent.startTime, 1)) {
              updatedEvent.endTime =  newTime;
              onEventUpdate(updatedEvent);
          }
      }
    }
  }, [selection, resizingItem, hourHeight, onEventUpdate]);

  const handleGlobalMouseUp = useCallback(() => {
    if (selection && Math.abs(selection.currentY - selection.startY) > 10) {
      const top = Math.min(selection.startY, selection.currentY);
      const height = Math.abs(selection.currentY - selection.startY);
      const startTime = yToTime(top, hourHeight);
      const endTime = yToTime(top + height, hourHeight);
      setShadowEvent({
          columnId: selection.columnId,
          startTime,
          endTime
      });
    }
    setSelection(null);
    if (resizingItem) {
      setResizingItem(null);
    }
  }, [selection, resizingItem, hourHeight]);

  useEffect(() => {
    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [handleGlobalMouseMove, handleGlobalMouseUp]);

  const handleContextMenu = (e, item, isNewSelection = false) => {
      e.preventDefault();
      setContextMenu({ x: e.pageX, y: e.pageY, item, isNewSelection });
  };

  const closeContextMenu = () => setContextMenu(null);

  useEffect(() => {
    document.addEventListener('click', closeContextMenu);
    return () => document.removeEventListener('click', closeContextMenu);
  }, []);

  const handleEventMouseEnter = (e, event) => {
    if (draggingItem || resizingItem) return;
    setHoveredEvent(event);
    setPreviewPosition({ x: e.clientX + 15, y: e.clientY + 15 });
  };

  const handleEventMouseLeave = () => {
    setHoveredEvent(null);
  };

  const handleDragStart = (e, event) => {
    setDraggingItem(event);
    setHoveredEvent(null);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', event.id);
  };

  const handleDragOver = (e, colIndex) => {
    e.preventDefault();
    const canDrop = isCrossColumnDragAllowed || columns[colIndex].id === draggingItem.columnId;
    if (!canDrop) {
        setDropIndicator(null);
        return;
    }
    e.currentTarget.classList.add('drag-over');

    if (draggingItem) {
        const rect = scheduleGridRef.current.getBoundingClientRect();
        let dropY = e.clientY - rect.top + scheduleGridRef.current.scrollTop - 40;
        const duration = getEventDuration(draggingItem.startTime, draggingItem.endTime);
        if (dropY + duration * hourHeight >= hourHeight * 24) {
            dropY = hourHeight * 24 - duration * hourHeight;
        }
        const newStartTime = yToTime(dropY, hourHeight);
        const newEndTime = yToTime(dropY + duration * hourHeight, hourHeight);

        setDropIndicator({
            top: timeToY(newStartTime, hourHeight) + 10,
            height: timeToY(newEndTime, hourHeight) - timeToY(newStartTime, hourHeight) - 10,
            left: `calc(${colIndex} * 100% / ${columns.length})`,
            width: `calc(100% / ${columns.length})`
        });
    }
  };

  const handleDragLeave = (e) => {
      e.currentTarget.classList.remove('drag-over');
      setDropIndicator(null);
  }

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    setDropIndicator(null);
    if (!draggingItem) return;

    const rect = scheduleGridRef.current.getBoundingClientRect();
    const dropY = e.clientY - rect.top + scheduleGridRef.current.scrollTop - 40;
    const newStartTime = yToTime(dropY, hourHeight);
    const duration = getEventDuration(draggingItem.startTime, draggingItem.endTime);
    const newEndTime = yToTime(dropY + duration * hourHeight, hourHeight);

    onEventUpdate({
        ...draggingItem,
        columnId: isCrossColumnDragAllowed ? columnId : draggingItem.columnId,
        startTime: newStartTime,
        endTime: newEndTime,
    });

    setDraggingItem(null);
  };

  const handleGridHover = (e) => {
    const contentArea = e.currentTarget;
    const rect = contentArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const colWidth = contentArea.clientWidth / columns.length;
    const colIndex = Math.floor(x / colWidth);
    const columnId = columns[colIndex]?.id;

    const hour = Math.floor(yToTime(y, hourHeight).split(':')[0]);

    if (columnId) {
        setHoveredCell({ hour, columnId });
    }
  };

  const renderGridLines = () => {
    const lines = [];
    for (let i = 0; i < 24; i++) {
        lines.push(<div key={`h-${i}`} className="hour-grid-line" style={{top: `${i * hourHeight}px`}}></div>);
        for (let j = 1; j < 4; j++) {
            lines.push(<div key={`q-${i}-${j}`} className="quarter-hour-grid-line" style={{top: `${i * hourHeight + j * (hourHeight / 4)}px`}}></div>);
        }
    }
    return lines;
  };

  const renderTimeLabels = () => {
      const labels = [];
      for (let i = 0; i < 24; i++) {
          const time = i === 0 ? '12am' : i < 12 ? `${i}am` : i === 12 ? '12pm' : `${i - 12}pm`;
          labels.push(
            <div key={i} className={`hour-slot ${hoveredCell?.hour === i ? 'highlighted' : ''}`} style={{top: `${i * hourHeight}px`, height: `${hourHeight}px`}}>
                <span className="hour-label">{time}</span>
            </div>
          )
      }
      return labels;
  }

  const renderSelectionBox = () => {
    if (!selection) return null;
    const top = Math.min(selection.startY, selection.currentY);
    const height = Math.abs(selection.currentY - selection.startY);
    const colIndex = columns.findIndex(c => c.id === selection.columnId);
    if (colIndex < 0) return null;

    const startTime = yToTime(top, hourHeight);
    const endTime = yToTime(top + height, hourHeight);

    return (
        <div
            className="selection-box"
            style={{
                top: `${timeToY(startTime, hourHeight)}px`,
                height: `${timeToY(endTime, hourHeight) - timeToY(startTime, hourHeight)}px`,
                left: `calc(${colIndex} * 100% / ${columns.length})`,
                width: `calc(100% / ${columns.length})`
            }}
        />
    );
  };

  const renderShadowEvent = () => {
    if (!shadowEvent) return null;
    const top = timeToY(shadowEvent.startTime, hourHeight);
    const height = timeToY(shadowEvent.endTime, hourHeight) - top;
    const colIndex = columns.findIndex(c => c.id === shadowEvent.columnId);
    if (colIndex < 0) return null;

    return (
        <div
            className="shadow-event"
            style={{
                top: `${top}px`,
                height: `${height}px`,
                left: `calc(${colIndex} * 100% / ${columns.length})`,
                width: `calc(100% / ${columns.length})`,
            }}
            onContextMenu={(e) => handleContextMenu(e, shadowEvent, true)}
        />
    );
  };

  const currentTimePosition = timeToY(`${currentTime.getHours()}:${currentTime.getMinutes()}`, hourHeight);

  return (
    <div className="schedule-container">
        <div className="schedule-toolbar">
            <div className="toolbar-section">
                <Button label="<" size="small" onClick={() => onDateChange(-1)} />
                <DatePicker name="schedule-date" value={currentDate} onChange={(e) => onDateChange(e.target.value)} />
                <Button label=">" size="small" onClick={() => onDateChange(1)} />
            </div>
            <div className="toolbar-section">
                <Toggle label="Allow Cross-Column Drag" enabled={isCrossColumnDragAllowed} setEnabled={setIsCrossColumnDragAllowed}
                />
            </div>
        </div>
        <div className="schedule-grid-wrapper" ref={scheduleGridRef}>
            <div className="schedule-grid-header">
                <div className="schedule-corner"></div>
                {columns.map(col => (
                    <div key={col.id} className={`column-header ${hoveredCell?.columnId === col.id ? 'highlighted' : ''}`}>{col.title}</div>
                ))}
            </div>
            <div className="schedule-grid-body" style={{ height: `${hourHeight * 24}px` }}>
                <div className="time-column">{renderTimeLabels()}</div>
                <div className="schedule-content-area" onMouseMove={handleGridHover} onMouseLeave={() => setHoveredCell(null)}>
                    <div className="grid-lines-container">{renderGridLines()}</div>
                    {columns.map((col, colIndex) => (
                        <div
                            key={col.id}
                            className="schedule-column"
                            onMouseDown={(e) => handleMouseDownOnColumn(e, col.id)}
                            onDragOver={(e) => handleDragOver(e, colIndex)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, col.id)}
                        >
                            {events.filter(item => item.columnId === col.id).map(item => {
                                const top = timeToY(item.startTime, hourHeight);
                                const height = timeToY(item.endTime, hourHeight) - top;
                                return (
                                    <div
                                        key={item.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, item)}
                                        onDragEnd={() => setDraggingItem(null)}
                                        className={`schedule-event ${draggingItem?.id === item.id ? 'dragging' : ''}`}
                                        style={{ top: `${top}px`, height: `${height}px` }}
                                        onContextMenu={(e) => handleContextMenu(e, item)}
                                        onMouseEnter={(e) => handleEventMouseEnter(e, item)}
                                        onMouseLeave={handleEventMouseLeave}
                                    >
                                        <div className="resize-handle top" onMouseDown={(e) => handleResizeStart(e, item, 'top')}></div>
                                        <div className="event-title">{item.title}</div>
                                        <div className="resize-handle bottom" onMouseDown={(e) => handleResizeStart(e, item, 'bottom')}></div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                    {renderShadowEvent()}
                    {dropIndicator && <div className="drop-indicator" style={dropIndicator}></div>}
                    <div className="current-time-line" style={{ top: `${currentTimePosition}px` }}></div>
                    {renderSelectionBox()}
                </div>
            </div>
        </div>
        {contextMenu && (
            <ul className="context-menu" style={{ top: contextMenu.y, left: contextMenu.x }}>
                {contextMenu.isNewSelection ? (
                    <li onClick={() => { onEventCreate(contextMenu.item); setShadowEvent(null); }}>Add New</li>
                ) : (
                    <>
                        <li onClick={() => onEventEdit(contextMenu.item)}>Edit</li>
                        <li onClick={() => onEventDelete(contextMenu.item)}>Delete</li>
                    </>
                )}
            </ul>
        )}
        <EventPreview event={hoveredEvent} position={previewPosition} />
    </div>
  );
};

Schedule.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any.isRequired,
    columnId: PropTypes.any.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  onEventUpdate: PropTypes.func,
  onEventEdit: PropTypes.func,
  onEventCreate: PropTypes.func,
  onEventDelete: PropTypes.func,
  currentDate: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
  allowCrossColumnDrag: PropTypes.bool,
};

Schedule.defaultProps = {
    onEventUpdate: () => {},
    onEventEdit: () => {},
    onEventCreate: () => {},
    onEventDelete: () => {},
    allowCrossColumnDrag: true,
}

export default Schedule;
