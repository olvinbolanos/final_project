import * as React from 'react';

export default function Header() {
  return (
    <header>
      <div
        className='p-5 text-center bg-light'
        style={{ backgroundImage: "url('https://i.ytimg.com/vi/nmcoIWmh3S8/maxresdefault.jpg')", height: '400px' }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', height: '100%', width: '100%' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>Welcome to TechTonicity</h1>
              <h4 className='mb-3'>Watch For Upcoming Drops Right Here!</h4>
              {/*
                  <a className='btn btn-primary' href='' role='button'>
                    Call to action
                </a>
                */}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}