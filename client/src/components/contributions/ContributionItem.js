import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import ImgsViewer from 'react-images-viewer';

const ContributionItem = ({
  contribution: { title, text, file, author, filetype, youtube, link },
}) => {
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  return (
    <div>
      <h1 className='text-primary'>{title}</h1>
      <h3 className='mb-1'>{author.name}</h3>
      {!filetype ? null : ReactPlayer.canPlay(file) ? (
        <ReactPlayer url={file} controls />
      ) : filetype === 'youtube' ? (
        <div>
          <ReactPlayer url={youtube} controls className='mb-1' />
          <a
            href={youtube}
            className='btn btn-primary'
            target='_blank'
            rel='noopener noreferrer'
          >
            Click Me!
          </a>{' '}
          to go to the website
        </div>
      ) : filetype === 'image/*' ? (
        <div>
          <div
            className='contribution-image-container'
            onClick={() => setViewerIsOpen(true)}
          >
            <img src={file} alt='' onClick={() => setViewerIsOpen(true)} />
            <ImgsViewer
              imgs={[{ src: file }]}
              showThumbnails
              enableKeyboardInput
              width='50vw'
              isOpen={viewerIsOpen}
              onClose={() => setViewerIsOpen(false)}
              backdropCloseable
            />
          </div>
        </div>
      ) : (
        <a
          href={link}
          className='btn btn-primary'
          target='_blank'
          rel='noopener noreferrer'
        >
          Click Me!
        </a>
      )}
      <div className='mb-1'></div>
      <p>{text}</p>
    </div>
  );
};

ContributionItem.propTypes = {
  contribution: PropTypes.object.isRequired,
};

export default ContributionItem;
