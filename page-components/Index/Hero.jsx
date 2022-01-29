import { ButtonLink } from '@/components/Button';
import { Container, Wrapper } from '@/components/Layout';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <Wrapper className={styles.root}>
      <div>
        <h1 className={styles.title}>
          <span className={styles.nextjs}>Ponyta</span>
          <span className={styles.mongodb}>Rocks</span>
          <span>App</span>
        </h1>
        <Container justifyContent="center" className={styles.buttons}>
          <Container>
            <Link passHref href="/feed">
              <ButtonLink className={styles.button}>Explore</ButtonLink>
            </Link>
          </Container>
        </Container>
      </div>
    </Wrapper>
  );
};

export default Hero;
