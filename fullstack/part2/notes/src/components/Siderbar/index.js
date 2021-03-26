import React from 'react';
import { ReactComponent as HomeIcon } from '../../assets/svg/home.svg';
import { ReactComponent as HeartIcon } from '../../assets/svg/heart.svg';
import { ReactComponent as TagIcon } from '../../assets/svg/tag.svg';

import {
  SidebarContainer,
  SidebarItem,
  SidebarLink,
  SidebarMenu,
  SidebarWrap
} from './SidebarElements';
import { Icon, CloseIcon } from '../StyledElements/Icon';

const SidebarItemWrap = (props) => {
  return (
    <SidebarItem>
      <SidebarLink to={props.path} onClick={props.handleClick}>
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
            path="/notes"
            handleClick={handleOpen}>
          </SidebarItemWrap>
          <SidebarItemWrap
            icon={<HeartIcon />}
            path="#"
            linkText="喜欢"
            handleClick={handleOpen}>
          </SidebarItemWrap>
          <SidebarItemWrap
            icon={<TagIcon />}
            path="#"
            linkText="书签"
            handleClick={handleOpen}>
          </SidebarItemWrap>
        </SidebarMenu>
      </SidebarWrap>
    </SidebarContainer>
  );
};

export default Siderbar;