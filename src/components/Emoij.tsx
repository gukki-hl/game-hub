import fires from '../assets/fires.png'
import smile from '../assets/smile.png'
import thinking from '../assets/thinking.png'
import {Image, ImageProps} from "@chakra-ui/react";

interface Props {
    rating: number;
}

const Emoij = ({rating}: Props) => {
    if (rating < 3) return null;

    //使用对象映射根据rating的不同动态渲染emoji
    const emojiMap: { [key: number]: ImageProps } = {
        3: {src: thinking, alt: 'meh', boxSize: '25px'},
        4: {src: fires, alt: 'recommended', boxSize: '30px'},
        5: {src: smile, alt: 'exceptional', boxSize: '35px'},
    }
    return (
        <Image {...emojiMap[rating]} marginTop={3}/>
    )
}

export default Emoij;