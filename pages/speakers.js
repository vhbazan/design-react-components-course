import Header from '../src/components/Header/Header';
import Menu from '../src/components/Menu/Menu';
import SpeakerSearchBar from '../src/components/SpeakerSearchBar/SpeakerSearchBar';
import Speakers from '../src/components/Speakers/Speakers';
import Footer from '../src/components/Footer/Footer';

function Page() {
    return (
       <div>
            <Header></Header>
            <Menu></Menu>
            <SpeakerSearchBar></SpeakerSearchBar>
            <Speakers></Speakers>
            <Footer></Footer>
       </div> 
    )
}

export default Page;