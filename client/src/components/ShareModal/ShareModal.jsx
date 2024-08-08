import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import PostShare from '../PostShare/PostShare'

function ShareModal({modalOpened,setModalOpened}) {

  const isMobile = useMediaQuery('(max-width: 50em)');

  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={()=>setModalOpened(false)}
        fullScreen={isMobile}
        size='55%'
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <PostShare/>
      </Modal>

    </>
  );
}
export default ShareModal