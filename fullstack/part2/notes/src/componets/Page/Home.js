import React from 'react';
import Header from '../Header/HomePage';
import Footer from '../Footer';
import styled from 'styled-components';
import Button from '../Button';
import Hero from '../../assets/hero.svg';
import Placeholder from '../../assets/placeholder.svg';
import Feature1 from '../../assets/feature_1.svg';
import Feature2 from '../../assets/feature_2.svg';
import Feature3 from '../../assets/feature_3.svg';
import FooterImgage from '../../assets/footer_1.svg';
import { Link } from 'react-router-dom';

const Container = styled.div`
  // Flex-items are stretched in cross axios (from left to right)
  display: flex;
  flex-direction: column;

  background-color: ${(props) =>
    props.backgroundColor ? 'var(--color-grey-01)' : 'transparent'};
`;

const HeroHeading = styled.h1`
  margin-bottom: var(--space-12);
  font-size: var(--heading-2xl-font-size);
  line-height: 1.2;
  letter-spacing: 2px;
`;

const Section = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: var(--space-48);
  padding-bottom: var(--space-48);
  padding-left: var(--space-8);
  padding-right: var(--space-8);
  text-align: center;

  @media (min-width: 320px) {
    padding-left: var(--space-16);
    padding-right: var(--space-16);
  }

  @media (min-width: 375px) {
    padding-left: var(--space-32);
    padding-right: var(--space-32);
  }

  @media (min-width: 768px) {
    flex-direction: ${props => props.reverse ? 'row-reverse' : 'row' };
    text-align: left;
    align-items: center;
    justify-content: space-between;
    padding-left: var(--space-48);
    padding-right: var(--space-48);
  }

  @media (min-width: 1120px) {
    // Avoid width being affected by automatic margins 
    // becomeing smaller
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
  }
`;

const HeroSection = styled(Section)`

  @media (min-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const HeroWrapper = styled.div`
  // the priority order on the z-axios copmared to normal elements
  position: relative;

  @media (min-width: 540px) {
    margin-bottom: var(--negative-space-15);
  }

  @media (min-width: 648px) {
    margin-bottom: var(--negative-space-25);
  }

  @media (min-width: 848px) {
    margin-bottom: var(--negative-space-35);
  }
  
  @media (min-width: 1120px) {
    margin-bottom: var(--negative-space-45);
  }
`;

const FeatureHeading = styled.h2`
  margin-bottom: var(--space-12);
  font-size: var(--heading-lg-font-size);
`;

const FeatureDetail = styled.p`
  font-size: 1.7rem;
  margin-bottom: var(--space-32);
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${props => props.hasJoinBtn ? 'var(--space-32)' : '0' };

  @media (min-width: 768px) {
    margin-bottom: ${props => props.hasJoinBtn && '0' };
  }
`;

const Img = styled.img`
  display: block;
`;

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <Container>
          <HeroSection>
            <HeroWrapper>
              <HeroHeading>将想法装进BOX</HeroHeading>
              <FeatureDetail>毫无压力 想记就记</FeatureDetail>
              <Button as={Link} to="/login">立刻加入</Button>
            </HeroWrapper>
            <div>
              <Img src={Hero} alt="使用 onebox 想记就记"/>
              <Img src={Placeholder} alt="使用 onebox 想记就记"/>
            </div>
          </HeroSection>
        </Container>
        <Container backgroundColor>
          <Section>
            <div>
              <FeatureHeading>不分类别，随时记录</FeatureHeading>
              <FeatureDetail>告别分类整理带给自己的压力，尽情记录</FeatureDetail>
            </div>
            <ImgWrapper>
              <Img src={Feature1} alt="使用 onebox 想记就记"/>
            </ImgWrapper>
          </Section>
        </Container>
        <Container>
          <Section reverse>
            <div>
              <FeatureHeading>回顾过去，轻松创意</FeatureHeading>
              <FeatureDetail>定期回顾以往记录的内容，常常可以获得新的视角和想法</FeatureDetail>
            </div>
            <ImgWrapper reverse>
              <Img src={Feature2} alt="使用 onebox 想记就记"/>
            </ImgWrapper>
          </Section>
        </Container>
        <Container backgroundColor>
          <Section>
            <div>
              <FeatureHeading>通过标签，快速查找笔记</FeatureHeading>
              <FeatureDetail>添加自定义标签，帮助你快速查找笔记</FeatureDetail>
            </div>
            <ImgWrapper>
              <Img src={Feature3} alt="使用 onebox 想记就记"/>
            </ImgWrapper>
          </Section>
        </Container>
        <Container>
          <Section>
            <ImgWrapper hasJoinBtn reverse>
              <Img src={FooterImgage} alt="使用 onebox 想记就记"/>
            </ImgWrapper>
            <div className="text-align-center">
              <FeatureHeading>将所有想法装进BOX</FeatureHeading>
              <FeatureDetail>毫无压力，想记就记</FeatureDetail>
            </div>
            <div>
              <Button as={Link} to="/login">立刻加入</Button>
            </div>
          </Section>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Home;