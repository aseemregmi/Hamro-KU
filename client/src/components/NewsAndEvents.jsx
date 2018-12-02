import React from 'react';

const NewsAndEvents = props => {
  return (
    <div className="news-and-events">
      <div>
        <p className="title">News And Events</p>
        <div className="contents">
          {props.news.map(item => {
            return <a href={item.link}>{item.item}</a>;
          })}
        </div>
      </div>
      <div>
        <p className="title">Notice And Announcement</p>
        <div className="contents">
          {props.events.map(item => {
            return <a href={item.link}>{item.item}</a>;
          })}
        </div>
      </div>
    </div>
  );
};

export default NewsAndEvents;
