import Link from 'next/link';
import Image from 'next/image'

import { Flex, Box, Text, Button } from '@chakra-ui/react';

import Property from '../components/Property';
import { baseUrl, fetchApi } from '../utils/fetchApi';

export const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, buttonColor, buttonTextColor, linkName }) => {
  return (
    <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='5'>
    <Image src='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008' width={500} height={300} />
    <Box p='10'>
      <Text color='gray.500' fontSize='sm' fontWeight='medium'>
        {purpose}
      </Text >
      <Text fontSize='3xl'>
     {title1}
      <br />
      {title2}
      </Text>
      <Text fontSize='lg' paddingTop='3' paddingBottom='3' color='gray.700'>
     {desc1}
      <br />
      {desc2}
      </Text>
      <Button fontSize='xl' bg={buttonColor} color={buttonTextColor}>
        <Link href={linkName}>
          <a>
          {buttonText}
          </a>
        </Link>
      </Button>
    </Box>
    </Flex>
  );
};

const Home = ({ propertiesForSale, propertiesForRent }) => {
  console.log(propertiesForRent)
  return (
    <Box>
    <Banner purpose='RENT A HOME' title1='Rental Homes for' title2='Everyone' desc1=' Explore from Apartments, builder floors, villas' desc2='and more' buttonText='Explore Renting' buttonColor='gray.100' buttonTextColor='gray.800' linkName='/search?purpose=for-rent' />
      <Flex flexWrap='wrap'>
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      <Banner purpose='BUY A HOME' title1=' Find, Buy & Own Your' title2='Dream Home' desc1=' Explore from Apartments, land, builder floors,' desc2=' villas and more' buttonText='Explore Buying' buttonColor='blue.300' buttonTextColor='white' linkName='/search?purpose=for-sale' />


      <Flex flexWrap='wrap'>
        {propertiesForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </Box>
  );
};

export async function getStaticProps() {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}

export default Home;
