import React, { useState, useEffect, useRef } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import './Timeline.css';

const Timeline = () => {
    const [activePopover, setActivePopover] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const popoverRef = useRef(null);

    const events = [
        { date: 'Sept 11, 2001', info: 'Bhavana' },
        { date: 'Oct 6, 2002', info: 'Event 2' },
        { date: 'Nov 8, 2003', info: 'Event 3' },
        { date: 'Dec 9, 2004', info: 'Event 4' },
    ];

    const events1 = [
        { date: 'Jan 10, 2005', info: 'Event 8' },
        { date: 'Feb 11, 2006', info: 'Event 7' },
        { date: 'Mar 12, 2007', info: 'Event 6' },
        { date: 'Apr 13, 2008', info: 'Event 5' }
    ];

    const events2 = [
        { date: 'May 14, 2009', info: 'Event 9' },
        { date: 'Jun 15, 2010', info: 'Event 10' },
        { date: 'Jul 16, 2011', info: 'Event 11' },
        { date: 'Aug 17, 2012', info: 'Event 12' }
    ];

    const handleDotClick = (index) => {
        setActivePopover(index === activePopover ? null : index);
    };

    const handleSearch = () => {
        const allEvents = [...events, ...events1, ...events2];
        const index = allEvents.findIndex(event => event.date === searchTerm);
        if (index !== -1) {
            setActivePopover(index);
        } else {
            setActivePopover(null);
        }
    };

    const handleClickOutside = (event) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target)) {
            setActivePopover(null);
        }
    };

    useEffect(() => {
        if (activePopover !== null) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activePopover]);

    return (
        <div className="timeline-container">
            <div className="search-container">
                <img src="/Logo.png" alt="Google Logo" className="google-logo" />
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search here..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button onClick={handleSearch} className="search-button">
                    <i className="search-icon"></i>
                </button>
            </div>

            <div className="timeline" ref={popoverRef}>
                <div className="line"></div>
                {events.map((event, index) => (
                    <OverlayTrigger
                        key={index}
                        trigger="click"
                        placement="top"
                        show={activePopover === index}
                        overlay={
                            <Popover id={`popover-positioned-top`}>
                                <Popover.Body>
                                    <img
                                        src="/ImgPop.png" className='popover-image' alt="World Trade Center" />
                                    The September 11 attacks (often referred to as 9/11) were a series of four coordinated ..... {' '}
                                    <a href="https://en.wikipedia.org/wiki/Main_Page" target="_blank" rel="noopener noreferrer">
                                        Click here
                                    </a>
                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <div className="dot" style={{ left: `${index * 25}%` }} onClick={() => handleDotClick(index)}>
                            <div className="label">
                                {event.date}
                            </div>
                            {index === events.length - 1 && (
                                <div className="connector-vertical"></div>
                            )}
                        </div>
                    </OverlayTrigger>
                ))}
                <div className="line newLine1"></div>
                {events1.map((event, index) => (
                    <OverlayTrigger
                        key={index}
                        trigger="click"
                        placement="top"
                        show={activePopover === index + events.length}
                        overlay={
                            <Popover id={`popover-positioned-top`}>
                                <Popover.Body>
                                    <div>
                                        <img src="/ImgPop.png" className="popover-image" alt="World Trade Center" />
                                        <p>
                                            The September 11 attacks (often referred to as 9/11) were a series of four coordinated .....
                                        </p>
                                        <a href="https://en.wikipedia.org/wiki/Main_Page" target="_blank" rel="noopener noreferrer">
                                            Click here
                                        </a>
                                    </div>

                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <div className="dot newDot1" style={{ left: `${index * 25}%` }} onClick={() => handleDotClick(index + events.length)}>
                        <div className="label">
                                {event.date}
                            </div>
                        </div>
                    </OverlayTrigger>
                ))}
                <div className="line newLine2"></div>
                {events2.map((event, index) => (
                    <OverlayTrigger
                        key={index}
                        trigger="click"
                        placement="top"
                        show={activePopover === index + events.length + events1.length}
                        overlay={
                            <Popover id={`popover-positioned-top`}>
                                <Popover.Body>
                                    <div>
                                        <img src="/ImgPop.png" className="popover-image" alt="World Trade Center" />
                                        <p>
                                            The September 11 attacks (often referred to as 9/11) were a series of four coordinated .....
                                        </p>
                                        <a href="https://en.wikipedia.org/wiki/Main_Page" target="_blank" rel="noopener noreferrer">
                                            Click here
                                        </a>
                                    </div>

                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <div className="dot newDot2" style={{ left: `${index * 25}%` }} onClick={() => handleDotClick(index + events.length + events1.length)}>
                            <div className="label">
                                {event.date}
                            </div>
                            {index === 0 && (
                                <div className="connector-vertical1"></div>
                            )}
                        </div>
                    </OverlayTrigger>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
