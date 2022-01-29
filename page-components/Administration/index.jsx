import { Container, Wrapper } from '@/components/Layout';
import { useCurrentUser, useUsers } from '@/lib/user';
import { LoadingDots } from '@/components/LoadingDots';
import { Text, TextLink } from '@/components/Text';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Avatar } from '@/components/Avatar';
import styles from './Administration.module.css';

const UserList = () => {
  const { data, size, setSize, isLoadingMore, isReachingEnd } = useUsers();
  const users = data
    ? data.reduce((acc, val) => [...acc, ...val.users], [])
    : [];

  return (
    <Wrapper>
      {users.map((user) => (
        <Container
          key={user._id}
          className={styles.root}
          column
          alignItems="center"
        >
          <div className={styles.avatar}>
            <Avatar
              size={99}
              username={user.username}
              url={user.profilePicture}
            />
          </div>
          <h1>
            <div className={styles.name}>{user.name}</div>
            <div className={styles.username}>@{user.username}</div>
          </h1>
          <p className={styles.bio}>{user.bio}</p>
        </Container>
      ))}

      <Container justifyContent="center">
        {isReachingEnd ? (
          <Text color="secondary">No more users are found</Text>
        ) : (
          <Button
            variant="ghost"
            type="success"
            loading={isLoadingMore}
            onClick={() => setSize(size + 1)}
          >
            Load more
          </Button>
        )}
      </Container>
    </Wrapper>
  );
};

export const Administration = () => {
  const { data: userData, error } = useCurrentUser();
  const loading = !userData && !error;

  if (loading) {
    return (
      <Wrapper>
        <LoadingDots>Loading</LoadingDots>
      </Wrapper>
    );
  }

  if (!userData?.user) {
    return (
      <Wrapper>
        <Text color="secondary">
          Please{' '}
          <Link href="/login" passHref>
            <TextLink color="link" variant="highlight">
              sign in
            </TextLink>
          </Link>{' '}
          to continue
        </Text>
      </Wrapper>
    );
  }

  if (userData?.user.type !== 'admin') {
    return (
      <Wrapper>
        <Text color="secondary">You don not have permission</Text>{' '}
      </Wrapper>
    );
  }

  return <UserList />;
};
