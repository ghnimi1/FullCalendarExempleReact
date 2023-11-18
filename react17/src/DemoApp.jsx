import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const MyCalendar = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogProf, setDialogProf] = useState('');

  const handleDateSelect = (arg) => {
    handleEventAdd()
    setIsDialogOpen(true);
  };

  const handleEventClick = (info) => {
    // Handle event click
    
  };

  const handleEventAdd = (selectInfo) => {
    if (selectInfo) {
      const { view, startStr, endStr, allDay } = selectInfo;
      let calendarApi = view.calendar;
  
      if (calendarApi) {
        console.log(calendarApi);
        calendarApi.unselect();
        calendarApi.addEvent({
          id: createEventId(),
          title: dialogTitle,
          daysOfWeek: ['1'],
          start: startStr,
          end: endStr,
          allDay: allDay,
          startTime:"10:00:00", // Ensure startTime is defined
          endTime:"12:00:00", // Ensure endTime is defined
        });
      }
    // Handle event addition
    // Implement the logic to add the event
    setIsDialogOpen(false); // Close dialog after event addition
    }
  };

  const renderEventContent = ({ event }) => {
    console.log(event);
    return (
      <div>
        <b>{event.title}</b>
       
      </div>
    );
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,dayGridMonth,timeGridDay'
        }}
        initialView='timeGridWeek'
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={weekendsVisible}
        select={handleDateSelect}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        // ... other props
      />
      {isDialogOpen && (
        <div className="dialog">
          <h2>Add Event</h2>
          <input
            type="text"
            placeholder="Title"
            value={dialogTitle}
            onChange={(e) => setDialogTitle(e.target.value)}
          />
        
          <button onClick={handleEventAdd}>Ajouter</button>
          <button onClick={() => setIsDialogOpen(false)}>Annuler</button>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;