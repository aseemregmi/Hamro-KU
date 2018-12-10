import React from 'react';

const NewsAndEvents = props => {
  return (
    <div className="news-and-events">
      <div>
        <p className="title">News And Events</p>
        <div className="contents">
          {props.fetchingStatus === 'fetching' ? (
            <a rel="noopener noreferrer" target="_blank" href="/">
              Getting News And Events. Click Here to Refresh
            </a>
          ) : null}
          {props.fetchingStatus === 'failed' ? (
            <a href="/">Couldn't get News And Events. Click Here to Refresh</a>
          ) : null}

          {props.news.map(item => {
            return (
              <a
                key={item.link}
                href={item.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                {item.item}
              </a>
            );
          })}
        </div>
      </div>
      <div>
        <p className="title">Notice And Announcement</p>
        <div className="contents">
          {props.fetchingStatus === 'failed' ? (
            <a href="/">Couldn't get News And Events. Click Here to Refresh</a>
          ) : null}
          {props.fetchingStatus === 'fetching' ? (
            <a href="/">Getting News And Events. Click Here to Refresh</a>
          ) : null}
          {props.events.map(item => {
            return (
              <a
                key={item.link}
                rel="noopener noreferrer"
                target="_blank"
                href={item.link}
              >
                {item.item}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewsAndEvents;
