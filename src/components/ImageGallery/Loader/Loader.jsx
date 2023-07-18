import { Blocks } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderWrapper>
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        // position="absolute"
        // top="50%"
        // left="50%"
        display="block"
        marginLeft="auto"
        marginRight="auto"
      />
    </LoaderWrapper>
  );
};
