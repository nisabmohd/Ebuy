import React from 'react'
import logo from '../assets/logo_black_bg.png'
import white_logo from '../assets/logo_white_bg.png'
import { useThemeContext } from '../contexts/Theme'
import SearchIcon from '@mui/icons-material/Search';

export default function Navbar() {
    const { dark } = useThemeContext()
    return (
        <div style={{ width: '100%', height: '50px', backgroundColor: dark ? 'rgba(255, 255, 255, 0.12)' : '#f8f9f9', boxShadow: !dark && '0px 2px 5px 0px rgba(235,235,235,1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="nav-content" style={{ width: '65%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="left-navbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img style={{ width: '138px' }} src={dark ? white_logo : logo} alt="" />
                </div>
                <div className="middle-navbar">
                    <div className="input_box_nav_search" style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', height: '32px', border: '1px solid #e2e2e2', padding: '5px 4px', borderRadius: '4px', width: '40vw' }}>
                        <SearchIcon />
                        <input type="text" placeholder='Search...' style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', marginLeft: '8px', height: '100%', fontSize: '14px', width: '97%' }} />
                    </div>
                </div>
                <div className="right-navbar"></div>
            </div>
        </div>
    )
}
