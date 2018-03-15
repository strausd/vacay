import React from 'react';
import { connect } from 'react-redux';


class CalendarPage extends React.Component {
    render() {
        return (
            <div className="container page-content">
                <h1>Calendar</h1>
                <p>Here you will see the PTO calendar for the company</p>
            </div>
        );
    }
}

export default CalendarPage;