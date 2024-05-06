import React from 'react';

function CustomMapLocation({ address }: { address: string }) {
  return (
    <div className="mapouter">
      <div className="gmap_canvas">
        <iframe
          width="100%"
          height="600"
          id="gmap_canvas"
          src={`https://maps.google.com/maps?q=${address}/&t=&z=17&ie=UTF8&iwloc=&output=embed`}
        ></iframe>
        <br />
        <style jsx>{`
          .mapouter {
            position: relative;
            text-align: right;
            height: 600px;
            width: 100%;
            border-radius: 20px;
            overflow: hidden;
          }
          .gmap_canvas {
            overflow: hidden;
            background: none !important;
            height: 600px;
            width: 100%;
          }
        `}</style>
      </div>
    </div>
  );
}

export default CustomMapLocation;
