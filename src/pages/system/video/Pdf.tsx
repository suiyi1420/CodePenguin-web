import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import defaultSettings from '../../../../config/defaultSettings';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';

import { useEffect, useRef, useState } from 'react';

const PdfPage: React.FC = (props: any) => {
  const { url } = props;
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;
  const viewer = () => {
    return (
      <div
        className="rpv-core__viewer"
        style={{
          border: '1px solid rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            backgroundColor: '#eeeeee',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            padding: '4px',
          }}
        >
          <Toolbar>
            {(props: ToolbarSlot) => {
              const {
                CurrentPageInput,
                EnterFullScreen,
                GoToNextPage,
                GoToPreviousPage,
                NumberOfPages,
                Print,
                ShowSearchPopover,
                Zoom,
                ZoomIn,
                ZoomOut,
              } = props;
              return (
                <>
                  <div style={{ padding: '0px 2px' }}>
                    <ShowSearchPopover />
                  </div>
                  <div style={{ padding: '0px 2px' }}>
                    <ZoomOut />
                  </div>
                  <div style={{ padding: '0px 2px' }}>
                    <Zoom />
                  </div>
                  <div style={{ padding: '0px 2px' }}>
                    <ZoomIn />
                  </div>
                  <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                    <GoToPreviousPage />
                  </div>
                  <div style={{ padding: '0px 2px', width: '4rem' }}>
                    <CurrentPageInput />
                  </div>
                  <div style={{ padding: '0px 2px' }}>
                    / <NumberOfPages />
                  </div>
                  <div style={{ padding: '0px 2px' }}>
                    <GoToNextPage />
                  </div>
                  <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                    <EnterFullScreen />
                  </div>

                  {/* <div style={{ padding: '0px 2px' }}>
                    <Print />
                  </div> */}
                </>
              );
            }}
          </Toolbar>
        </div>
        <div
          style={{
            flex: 1,
            overflow: 'hidden',
          }}
        >
          <Viewer fileUrl={url} plugins={[toolbarPluginInstance]} />
        </div>
      </div>
    );
  };
  return (
    <Worker workerUrl={'https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'}>
      <div style={{ height: 'calc(100vh - 94px - 48px)' }}>
        {/* <Viewer fileUrl={url} plugins={[defaultLayoutPluginInstance]} initialPage={0}></Viewer> */}
        {viewer()}
      </div>
    </Worker>
  );
};

export default PdfPage;
