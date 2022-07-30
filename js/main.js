
var app = new Vue({
  
  el: '#app',
  data: {
    movieCurrentTime: 0,
    favoriteProducts: [],
    detailBoxPosition: [5, 20],
    detailBoxIsDisplay: false,
    isShowNextButton: false,
    isShowBackButton: false,
    rightSpace: 0,
    products: [
      {
        name: '[幅200]ポップアップテント ショルダー収納バッグ付き UVカット',
        price: '29,990',
        img: '../assets/images/tent.jpg',
        alt: 'テント',
        isFreePostage: true,
        link: '',
        isFavorite: false,
        position: ['150', '300'],
        showTime: [0, 2.1],
      },
      {
        name: 'アウトドアチェア[ハイタイプ] 折りたたみ椅子',
        price: '5,090',
        img: '../assets/images/hi-chair.jpg',
        alt: 'ハイチェア',
        isFreePostage: true,
        link: '',
        isFavorite: false,
        position: ['210', '600'],
        showTime: [2.25, 3.77],
      },
      {
        name: 'アウトドアチェア[ミドル] 折りたたみ椅子',
        price: '3,990',
        img: '../assets/images/middle-chair.jpg',
        alt: 'ミドルチェア',
        isFreePostage: true,
        link: '',
        isFavorite: false,
        position: ['160', '300'],
        showTime: [6.69, 7.8],
      },
      {
        name: '折りたたみアウトドアテーブル[幅73] ROOM ESSENCE',
        price: '6,990',
        img: '../assets/images/table.jpg',
        alt: 'テーブル',
        isFreePostage: true,
        link: '',
        isFavorite: false,
        position: ['250', '150'],
        showTime: [12.2, 14.0],
      },
    ],
  },
  methods: {
    updateMovieTime(){
      const movie01 = document.getElementById('movie');
      movie01.playbackRate = 0.5;

      movie01.addEventListener('timeupdate', ()=> {
        this.movieCurrentTime = movie01.currentTime;
        document.getElementById('movie-time').textContent = this.movieCurrentTime;

        for(index=0; index<this.products.length; index++){
          const indexString = String(index);
          if(movie01.currentTime>this.products[index].showTime[0] && movie01.currentTime<this.products[index].showTime[1]){
            document.getElementById('hotspot-'+indexString).hidden = false;
          }
          else{
            document.getElementById('hotspot-'+indexString).hidden = true;
            document.getElementById('detail-box-'+indexString).hidden = true;
          }
        }
      });
    },
    onClick(index){
      const indexString = String(index);
      const movie01 = document.getElementById('movie');
      movie01.pause();
      this.detailBoxPosition = [5, 20];
      this.detailBoxIsDisplay = true;
      document.getElementById('detail-box-'+indexString).hidden = false;
    },
    quiteDetail(index){
      const indexString = String(index);
      const movie01 = document.getElementById('movie');
      document.getElementById('detail-box-'+indexString).hidden = true;
      movie01.play();
    },
    favorite(index){
      const indexString = String(index);
      const movie01 = document.getElementById('movie');
      
      this.products[index].isFavorite = !this.products[index].isFavorite;
      if(this.products[index].isFavorite){
        this.favoriteProducts.push(this.products[index]);
        this.detailBoxPosition = [2, 90];
        setTimeout(()=>{
          // this.detailBoxIsDisplay = false;
          document.getElementById('detail-box-'+indexString).hidden = true;
          movie01.play();
        },500);
      }
      else{
        this.favoriteProducts.shift(this.products[index]);
      }
    },
    checkProducts(){
      document.getElementById('check-favorite-product').hidden = false;
      const maxSpace = this.favoriteProducts.length*175 + (this.favoriteProducts.length-1)*20;
      console.log(maxSpace)
      if(maxSpace>630){
        this.isShowNextButton = true;
        this.isShowBackButton = false;
      }
      else{
        this.isShowNextButton = false;
        this.isShowBackButton = false;
      }
      for(index=0; index<=this.products.length; index++){
        const indexString = String(index);
        document.getElementById('detail-box-'+indexString).hidden = true;
      }
    },
    quiteCheckProducts(){
      document.getElementById('check-favorite-product').hidden = true;
    },
    nextProduct(){
      const maxSpace = this.favoriteProducts.length*175 + (this.favoriteProducts.length-1)*20;
      this.rightSpace += maxSpace - 630 - 20;
      this.isShowNextButton = false;
      this.isShowBackButton = true;
    },
    backProduct(){
      const maxSpace = this.favoriteProducts.length*175 + (this.favoriteProducts.length-1)*20;
      this.rightSpace -= maxSpace - 630 -20;
      this.isShowNextButton = true;
      this.isShowBackButton = false;
    }
  },
  mounted() {
    this.updateMovieTime();
  },
})