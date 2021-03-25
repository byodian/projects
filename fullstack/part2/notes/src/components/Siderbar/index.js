import React, { useState } from 'react';
import { ReactComponent as HomeIcon } from '../../assets/svg/home.svg';
import { ReactComponent as HeartIcon } from '../../assets/svg/heart.svg';
import { ReactComponent as TagIcon } from '../../assets/svg/tag.svg';


import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarItem,
  SidebarLink,
  SidebarMenu,
  SidebarWrap
} from './SidebarElements';

const SidebarItemWrap = (props) => {

  return (
    <SidebarItem>
      <SidebarLink to="#" onClick={props.handleClick}>
        {props.icon}
        <span>{props.linkText}</span>
      </SidebarLink>

      {open && props.children}
    </SidebarItem>
  );
};

const Siderbar = ({ isOpen, handleOpen }) => {

  return (
    <SidebarContainer isOpen={isOpen}>
      <Icon>
        <CloseIcon onClick={handleOpen}/>
      </Icon>
      <SidebarWrap>
        <SidebarMenu>
          <SidebarItemWrap
            icon={<HomeIcon />}
            linkText="全部"
            handleClick={handleOpen}>
          </SidebarItemWrap>
          <SidebarItemWrap
            icon={<HeartIcon />}
            linkText="喜欢"
            handleClick={handleOpen}>
          </SidebarItemWrap>
          <SidebarItemWrap
            icon={<TagIcon />}
            linkText="书签"
            handleClick={handleOpen}>
          </SidebarItemWrap>
        </SidebarMenu>
      </SidebarWrap>
    </SidebarContainer>
  );
};

export default Siderbar;