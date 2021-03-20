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
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: var(--space-48) var(--space-32);
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: ${props => props.reverse ? 'row-reverse' : 'row' };
    text-align: left;
    align-items: center;
    justify-content: space-between;
    padding-left: var(--space-64);
    padding-right: var(--space-64);
  }

  @media (min-width: 1024px) {
    padding-left: var(--space-96);
    padding-right: var(--space-96);
  }

  @media (min-width: 1120px) {
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
  }
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: var(--space-48) var(--space-24);
  text-align: center;

  @media (min-width: 768px) {
    padding-left: var(--space-48);
    padding-right: var(--space-48);
  }
`;

const HeroWrapper = styled.div`
  position: relative;
  margin-bottom: var(--negative-space-35);
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
    justify-content: ${props => props.reverse ? 'flex-start' : 'flex-end' };
    margin-bottom: ${props => props.hasJoinBtn && '0' };
  }
`;

const Img = styled.img`
  display: block;
  width: 75%;
`;

const HeroImg = styled(Img)`
  width: 100%;
`;

const BottomImg = styled(Img)`
  width: 100%;
`;

const ButtonWrapper = styled.div`
  flex-basis: 126px;
`;

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <Container>
          <HeroSection>
            <HeroWrapper>
              <HeroHeading>将想法装进 BOX</HeroHeading>
              <FeatureDetail>毫无压力 想记就记</FeatureDetail>
              <Button as="a" href="/login">立刻加入</Button>
            </HeroWrapper>
            <div>
              <HeroImg src={Hero} alt="使用 onebox 想记就记"/>
              <HeroImg src={Placeholder} alt="使用 onebox 想记就记"/>
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
              <BottomImg src={FooterImgage} alt="使用 onebox 想记就记"/>
            </ImgWrapper>
            <div className="text-align-center">
              <FeatureHeading>将所有想法装进 BOX</FeatureHeading>
              <FeatureDetail>毫无压力，想记就记</FeatureDetail>
            </div>
            <ButtonWrapper>
              <Button as="a" href="/login">立刻加入</Button>
            </ButtonWrapper>
          </Section>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Home;