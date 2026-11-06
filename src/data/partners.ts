// Ta sama lista trafia do paczki i może być edytowana bez kompilacji na OVH.
import config from '../../public/zdjecia/partnerzy/partnerzy.json';
export const partners = config.map(partner => ({
  name: partner.name,
  logo: `/zdjecia/partnerzy/${partner.logo}`,
  placeholder: false,
}));
