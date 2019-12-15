export default {
  items: [
    {
      name: "Home",
      url: "/",
      icon: 'mdi-home'
    },
    {
      name: "Video",
      icon: 'mdi-video',
      sub: [
        {
          name: 'List Video',
          url: '/video/list',
        },
        {
          name: "Add Video",
          url: '/video/add',
        },
      ]
    }
  ]
}