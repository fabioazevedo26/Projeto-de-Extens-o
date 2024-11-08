import React from 'react';
import { Share, Button,  } from 'react-native';

interface ShareProductProps {
  link: string;
}

const ShareProduct: React.FC<ShareProductProps> = ({ link }) => {
  const shareToWhatsApp = () => {
    Share.share({
      message: `Confira este produto: ${link}`,
    });
  };

  return <Button title="Compartilhar no WhatsApp" onPress={shareToWhatsApp} />;
};


export default ShareProduct;
