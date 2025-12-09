import idocImage1 from '~/assets/idoc1.jpeg';
import idocImage2 from '~/assets/idoc2.jpeg';
import stockzenImage from '~/assets/stockzen.jpeg';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Designer + Developer',
    description: `Design portfolio of ${config.name} — a product designer working on web & mobile apps with a focus on motion, experience design, and accessibility.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const iDocRef = useRef();
  const stockzenRef = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, iDocRef, stockzenRef, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={iDocRef}
        visible={visibleSections.includes(iDocRef.current)}
        index={1}
        title="iDoc - Online Doctor Consultancy"
        description="A mobile application that connects patients with doctors for online consultations and medical advice."
        buttonText="View on GitHub"
        buttonLink="https://github.com/nishmajabin/iDoc_user"
        model={{
          type: 'phone',
          alt: 'iDoc Online Doctor Consultancy App',
          textures: [
            {
              srcSet: `${idocImage2} 375w, ${idocImage2} 750w`,
              placeholder: idocImage1,
            },
            {
              srcSet: `${idocImage1} 375w, ${idocImage1} 750w`,
              placeholder: idocImage2,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={stockzenRef}
        visible={visibleSections.includes(stockzenRef.current)}
        index={2}
        title="StockZen - Inventory Management"
        description="A comprehensive stock management app to help businesses efficiently track and manage their inventory."
        buttonText="View on GitHub"
        buttonLink="https://github.com/nishmajabin/stockZen"
        model={{
          type: 'phone',
          alt: 'StockZen Inventory Management App',
          textures: [
            {
              srcSet: `${stockzenImage} 375w, ${stockzenImage} 750w`,
              placeholder: stockzenImage,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
