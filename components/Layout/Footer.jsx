import { Text } from '@/components/Text';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import styles from './Footer.module.css';
import Spacer from './Spacer';
import Wrapper from './Wrapper';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Wrapper>
        <Text color="accents-7">Made with love in Taipei</Text>
        <Spacer size={1} axis="vertical" />
        <ThemeSwitcher />
      </Wrapper>
    </footer>
  );
};

export default Footer;
