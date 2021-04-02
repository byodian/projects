import React from 'react';
import { ReactComponent as HomeIcon } from '../../assets/svg/home.svg';
import { ReactComponent as HeartIcon } from '../../assets/svg/heart.svg';
import { ReactComponent as TagIcon } from '../../assets/svg/tag.svg';

import {
  SidebarContainer,
  SidebarItem,
  SidebarLink,
  SidebarMenu,
  SidebarWrap,
  SidebarHamburgerIcon,
  DropdownMenu,
  DropdownLink,
  DropdownContent
} from './SidebarElements';
import { Hamburger, TagIcon as TagIconButton } from '../StyledElements/Icon';
import { HamburgerButton } from '../StyledElements/Button';

const SidebarItemWrap = (props) => {
  return (
    <SidebarItem>
      <SidebarLink to={props.path}>
        {props.icon}
        <span>{props.linkText}</span>
      </SidebarLink>

      {open && props.children}
    </SidebarItem>
  );
};

const Siderbar = ({ isOpen, handleOpen, tags }) => {

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHamburgerIcon>
        <HamburgerButton  onClick={handleOpen}>
          <Hamburger></Hamburger>
        </HamburgerButton>
      </SidebarHamburgerIcon>
      <SidebarWrap>
        <SidebarMenu>
          <SidebarItemWrap
            icon={<HomeIcon />}
            linkText="全部"
            path="/notes"
          >
          </SidebarItemWrap>
          <SidebarItemWrap
            icon={<HeartIcon />}
            path="/favorites"
            linkText="喜欢"
          >
          </SidebarItemWrap>
          <SidebarItemWrap
            icon={<TagIcon />}
            path="/tags"
            linkText="标签"
          >
            <DropdownMenu>
              {tags.map(tag => (
                <DropdownLink
                  key={tag}
                  to={`/tags/${tag}`}>
                  <TagIconButton></TagIconButton>
                  <DropdownContent>{tag}</DropdownContent>
                </DropdownLink>
              ))}
            </DropdownMenu>
          </SidebarItemWrap>
        </SidebarMenu>
      </SidebarWrap>
    </SidebarContainer>
  );
};

export default Siderbar;