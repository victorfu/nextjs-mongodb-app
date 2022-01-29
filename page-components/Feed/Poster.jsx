import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Container, Wrapper } from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import { Text, TextLink } from '@/components/Text';
import { fetcher } from '@/lib/fetch';
import { usePostPages } from '@/lib/post';
import { useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './Poster.module.css';
import Image from 'next/image';

const PosterInner = ({ user }) => {
  const contentRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const imageRef = useRef();
  const [imageHref, setImageHref] = useState();

  const { mutate } = usePostPages();

  const onImageChange = useCallback((e) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (l) => {
      setImageHref(l.currentTarget.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('content', contentRef.current.value);
        if (imageRef.current.files[0]) {
          formData.append('postImage', imageRef.current.files[0]);
        }
        await fetcher('/api/posts', {
          method: 'POST',
          body: formData,
        });
        toast.success('You have posted successfully');
        contentRef.current.value = '';
        // refresh post lists
        mutate();
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate]
  );

  return (
    <form onSubmit={onSubmit}>
      <Container className={styles.poster}>
        <Avatar size={40} username={user.username} url={user.profilePicture} />
        <Input
          ref={contentRef}
          className={styles.input}
          placeholder={`What's on your mind, ${user.name}?`}
          ariaLabel={`What's on your mind, ${user.name}?`}
        />
        <Button type="success" loading={isLoading}>
          Post
        </Button>
      </Container>
      <Container className={styles.poster}>
        {imageHref && (
          <Image height={96} width={96} src={imageHref} alt="post-img" />
        )}
        <input
          aria-label="Post Image"
          type="file"
          accept="image/*"
          ref={imageRef}
          onChange={onImageChange}
        />
      </Container>
    </form>
  );
};

const Poster = () => {
  const { data, error } = useCurrentUser();
  const loading = !data && !error;

  return (
    <Wrapper>
      <div className={styles.root}>
        <h3 className={styles.heading}>Share your thoughts</h3>
        {loading ? (
          <LoadingDots>Loading</LoadingDots>
        ) : data?.user ? (
          <PosterInner user={data.user} />
        ) : (
          <Text color="secondary">
            Please{' '}
            <Link href="/login" passHref>
              <TextLink color="link" variant="highlight">
                sign in
              </TextLink>
            </Link>{' '}
            to post
          </Text>
        )}
      </div>
    </Wrapper>
  );
};

export default Poster;
