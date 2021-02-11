
import Speakers from '../src/components/Speakers/SpeakersRenderProps';
import Layout from '../src/components/Layout/Layout';
import SpeakersHOC from '../src/components/Speakers/SpeakersHOC';

function Page() {
    return (
       <Layout>
            <Speakers bgColor="bg-gray-500"/>
        </Layout> 
    )
}

export default Page;