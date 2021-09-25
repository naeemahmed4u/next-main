import React from 'react';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';



export const SideBarData=[
{
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome/>,
    cName: 'nav-text'
},
{
    title: 'Asset',
    path: '/',
    icon: <AiIcons.AiOutlineLogin/>,
    cName: 'nav-text',
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
        {
          title: 'Add Asset',
          path: '/AddAsset',
          icon: <IoIcons.IoIosPaper />,
          cName: 'sub-nav'
        },
        {
          title: 'List of Asset',
          path: '/GetAsset',
          icon: <IoIcons.IoIosPaper />,
          cName: 'sub-nav'
        }
      ]
},
{
    title: 'Sign Up',
    path: '/Signup',
    icon: <AiIcons.AiOutlineLogout/>,
    cName: 'nav-text'
},
{
    title: 'Reports',
    path: '/Reports',
    cName: 'nav-text',
    icon: <IoIcons.IoIosPaper/>,
    iconClosed:<RiIcons.RiArrowDownSFill/>,
    iconOpened: <RiIcons.RiArrowUpSFill/>,
    subNav:[
        {
            title: 'Users',
            path: '/Reports/Users',            
            icon:<IoIcons.IoIosPaper/>,
            cName: 'sub-nav'
        },
        {
            title: 'Revenue',
            path: '/Reports/Revenue',            
            icon:<IoIcons.IoIosPaper/>,
            cName: 'sub-nav'
        }    
    ]
},
{
    title: 'Products',
    path: '/Products',
    icon: <FaIcons.FaCartPlus/>,
    cName: 'nav-text'
},
{
    title: 'Team',
    path: '/Team',
    icon: <IoIcons.IoMdPeople/>,
    cName: 'nav-text'
},
]