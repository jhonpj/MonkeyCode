import React from 'react';
import nodata from '../../assets/images/nodata.png';

const Expectation = () => {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        padding: 32,
      }}
    >
      <img
        src={nodata}
        alt='敬请期待'
        style={{ width: 180, marginBottom: 24, opacity: 0.8 }}
      />
      <h2 style={{ color: '#222', fontWeight: 600, marginBottom: 8 }}>
        敬请期待
      </h2>
      <div style={{ color: '#888', fontSize: 16 }}>
        更多精彩内容即将上线，敬请期待！
      </div>
    </div>
  );
};

export default Expectation;
