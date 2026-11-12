const UPLOAD_BASE = 'https://altronindia.com/wp-content/uploads/2023/11'

export type AgbmGalleryImage = {
  thumb: string
  full: string
}

export type AgbmGalleryTab = {
  id: string
  /** Match live site tab labels (including original spelling). */
  title: string
  layout: 'carousel' | 'wide'
  images: AgbmGalleryImage[]
}

function item(thumbFile: string, fullFile?: string): AgbmGalleryImage {
  return {
    thumb: `${UPLOAD_BASE}/${thumbFile}`,
    full: `${UPLOAD_BASE}/${fullFile ?? thumbFile}`,
  }
}

export const AGBM_GALLERY_TABS: AgbmGalleryTab[] = [
  {
    id: 'staff-speech',
    title: 'Staff Speech',
    layout: 'carousel',
    images: [
      item('29.jpg'),
      item('30.jpg'),
      item('45-272x182.jpg', '45.jpg'),
      item('31.jpg'),
      item('32.jpg'),
      item('47-272x182.jpg', '47.jpg'),
      item('33.jpg'),
      item('34.jpg'),
      item('50-272x182.jpg', '50.jpg'),
    ],
  },
  {
    id: 'team-members',
    title: 'Team Members',
    layout: 'carousel',
    images: [
      item('58-272x182.jpg', '58.jpg'),
      item('60-272x182.jpg', '60.jpg'),
      item('61-272x182.jpg', '61.jpg'),
      item('62-272x182.jpg', '62.jpg'),
      item('63-272x182.jpg', '63.jpg'),
      item('64-272x182.jpg', '64.jpg'),
      item('65-272x182.jpg', '65.jpg'),
      item('66-272x182.jpg', '66.jpg'),
    ],
  },
  {
    id: 'chief-guest',
    title: 'Cheif Guest Speech',
    layout: 'carousel',
    images: [
      item('35-272x182.jpg', '35.jpg'),
      item('37-272x182.jpg', '37.jpg'),
      item('39-272x182.jpg', '39.jpg'),
      item('38-272x182.jpg', '38.jpg'),
      item('2-272x182.jpg', '2.jpg'),
      item('3-272x182.jpg', '3.jpg'),
    ],
  },
  {
    id: 'dealer-distributor',
    title: 'Dealer and Distributor',
    layout: 'wide',
    images: [
      item('2-436x272.jpg', '2.jpg'),
      item('35-436x272.jpg', '35.jpg'),
      item('51-436x272.jpg', '51.jpg'),
      item('52-436x272.jpg', '52.jpg'),
      item('53-436x272.jpg', '53.jpg'),
      item('54-436x272.jpg', '54.jpg'),
      item('55-436x272.jpg', '55.jpg'),
      item('56-436x272.jpg', '56.jpg'),
      item('57-436x272.jpg', '57.jpg'),
    ],
  },
  {
    id: 'best-achievers',
    title: 'Best Acheivers Awards',
    layout: 'carousel',
    images: [
      item('12-272x182.jpg', '12.jpg'),
      item('13-272x182.jpg', '13.jpg'),
      item('14-272x182.jpg', '14.jpg'),
      item('15-272x182.jpg', '15.jpg'),
      item('5-272x182.jpg', '5.jpg'),
      item('6-272x182.jpg', '6.jpg'),
      item('7-272x182.jpg', '7.jpg'),
      item('8-272x182.jpg', '8.jpg'),
      item('9-272x182.jpg', '9.jpg'),
      item('11-272x182.jpg', '11.jpg'),
      item('10-272x182.jpg', '10.jpg'),
      item('16-272x182.jpg', '16.jpg'),
      item('17-272x182.jpg', '17.jpg'),
      item('18-272x182.jpg', '18.jpg'),
      item('19-272x182.jpg', '19.jpg'),
      item('20-272x182.jpg', '20.jpg'),
      item('21-272x182.jpg', '21.jpg'),
      item('24-272x182.jpg', '24.jpg'),
      item('23-272x182.jpg', '23.jpg'),
      item('22-272x182.jpg', '22.jpg'),
      item('25-272x182.jpg', '25.jpg'),
      item('26-272x182.jpg', '26.jpg'),
      item('27-272x182.jpg', '27.jpg'),
      item('28-272x182.jpg', '28.jpg'),
      item('68-272x182.jpg', '68.jpg'),
      item('69-272x182.jpg', '69.jpg'),
    ],
  },
  {
    id: 'md-speech',
    title: 'Managing Directors Speech',
    layout: 'carousel',
    images: [item('67-272x182.jpg', '67.jpg')],
  },
]
