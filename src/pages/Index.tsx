import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Series {
  id: number;
  title: string;
  genre: string;
  rating: number;
  year: number;
  image: string;
  description: string;
  reviews: Review[];
  isNew?: boolean;
  isTrending?: boolean;
  duration?: string;
  episodes?: number;
  seasons?: number;
  cast?: string[];
  director?: string;
  trailerUrl?: string;
  fullDescription?: string;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface WatchHistory {
  seriesId: number;
  episodeNumber: number;
  seasonNumber: number;
  watchedAt: string;
  progress: number;
}

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  watchHistory: WatchHistory[];
  preferences: string[];
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Анна Петрова',
    email: 'anna@example.com',
    watchHistory: [
      { seriesId: 1, episodeNumber: 3, seasonNumber: 1, watchedAt: '2024-07-20', progress: 45 },
      { seriesId: 2, episodeNumber: 1, seasonNumber: 1, watchedAt: '2024-07-19', progress: 100 },
      { seriesId: 3, episodeNumber: 5, seasonNumber: 2, watchedAt: '2024-07-18', progress: 78 }
    ],
    preferences: ['Драма', 'Фантастика']
  });

  const genres = ['Все', 'Драма', 'Комедия', 'Фантастика', 'Триллер', 'Детектив', 'Романтика'];

  const series: Series[] = [
    {
      id: 1,
      title: "Корпоративные интриги",
      genre: "Драма",
      rating: 4.8,
      year: 2024,
      image: "/img/b01edc87-748b-4375-9db2-3c9aed9a116e.jpg",
      description: "Захватывающая история о борьбе за власть в крупной корпорации",
      fullDescription: "Увлекательный сериал о жестоком мире корпоративной Америки, где каждый день - это битва за выживание. Главные герои сталкиваются с моральными дилеммами, предательством и сложными человеческими отношениями в стремлении достичь вершины карьерной лестницы.",
      duration: "60 мин",
      episodes: 12,
      seasons: 3,
      cast: ["Майкл Дуглас", "Сара Джессика Паркер", "Кевин Спейси"],
      director: "Дэвид Финчер",
      trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      isNew: true,
      isTrending: true,
      reviews: [
        { id: 1, author: "Анна К.", rating: 5, text: "Отличный сериал! Очень реалистично показана корпоративная жизнь.", date: "2024-07-15" },
        { id: 2, author: "Михаил П.", rating: 4, text: "Интересный сюжет, хорошая игра актеров.", date: "2024-07-10" }
      ]
    },
    {
      id: 2,
      title: "Будущее уже здесь",
      genre: "Фантастика",
      rating: 4.6,
      year: 2024,
      image: "/img/45bf9afd-0481-4faf-84a7-55df73fc26bc.jpg",
      description: "Киберпанк-триллер о мире будущего и технологических революциях",
      fullDescription: "В недалеком будущем, где технологии полностью изменили человеческую цивилизацию, группа хакеров борется против корпоративной диктатуры. Сериал исследует темы искусственного интеллекта, виртуальной реальности и того, что значит быть человеком в цифровую эпоху.",
      duration: "45 мин",
      episodes: 10,
      seasons: 2,
      cast: ["Райан Гослинг", "Скарлетт Йоханссон", "Оскар Айзек"],
      director: "Дени Вильнёв",
      trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      isNew: true,
      reviews: [
        { id: 3, author: "Елена В.", rating: 5, text: "Потрясающие спецэффекты и глубокий сюжет!", date: "2024-07-20" },
        { id: 4, author: "Дмитрий Л.", rating: 4, text: "Очень атмосферно, напоминает Blade Runner.", date: "2024-07-18" }
      ]
    },
    {
      id: 3,
      title: "Семейное счастье",
      genre: "Комедия",
      rating: 4.4,
      year: 2023,
      image: "/img/cbe34d83-b1e3-44cd-a9a2-f908697f7844.jpg",
      description: "Добрая семейная комедия о повседневной жизни обычной семьи",
      fullDescription: "Теплая и добрая комедия о современной семье, которая сталкивается с повседневными проблемами и радостями. Сериал показывает, как важны семейные ценности, любовь и взаимопонимание в нашем быстро меняющемся мире.",
      duration: "30 мин",
      episodes: 24,
      seasons: 4,
      cast: ["Сергей Безруков", "Елена Яковлева", "Андрей Мерзликин"],
      director: "Александр Баранов",
      trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      isTrending: true,
      reviews: [
        { id: 5, author: "Ольга С.", rating: 4, text: "Очень добрый и теплый сериал, смотрим всей семьей.", date: "2024-07-12" },
        { id: 6, author: "Андрей К.", rating: 5, text: "Наконец-то качественная российская комедия!", date: "2024-07-08" }
      ]
    }
  ];

  const filteredSeries = series.filter(show => {
    const matchesSearch = show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         show.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'Все' || show.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const updateWatchProgress = (seriesId: number, episode: number, season: number, progress: number) => {
    setUserProfile(prev => ({
      ...prev,
      watchHistory: [
        ...prev.watchHistory.filter(h => h.seriesId !== seriesId),
        { seriesId, episodeNumber: episode, seasonNumber: season, watchedAt: new Date().toISOString().split('T')[0], progress }
      ]
    }));
  };

  const getRecommendedSeries = () => {
    const userGenres = userProfile.preferences;
    return series.filter(show => 
      userGenres.includes(show.genre) && !userProfile.watchHistory.some(h => h.seriesId === show.id)
    ).slice(0, 3);
  };

  const recommendedSeries = getRecommendedSeries();

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Icon
            key={star}
            name="Star"
            size={16}
            className={star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-white/20 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-xl">
                <Icon name="Play" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                СериалМастер
              </h1>
            </div>
            
            <nav className="hidden md:flex gap-6">
              <Button variant="ghost" className="hover:bg-primary/10">Главная</Button>
              <Button variant="ghost" className="hover:bg-primary/10">Сериалы</Button>
              <Button variant="ghost" className="hover:bg-primary/10">Жанры</Button>
              <Button variant="ghost" className="hover:bg-primary/10">Топ</Button>
              <Button variant="ghost" className="hover:bg-primary/10">Новинки</Button>
            </nav>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Поиск сериалов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-white/50 backdrop-blur-sm border-white/30"
                />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90" onClick={() => setShowProfile(true)}>
                    <Icon name="User" size={18} />
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 animate-float"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in">
            Лучшие сериалы 2024
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
            Откройте для себя самые популярные и высоко оцененные сериалы года. 
            Читайте отзывы, ставьте оценки и находите новые любимые шоу.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-lg px-8 py-3 animate-scale-in"
          >
            <Icon name="Play" className="mr-2" size={20} />
            Начать просмотр
          </Button>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {genres.map(genre => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                onClick={() => setSelectedGenre(genre)}
                className={selectedGenre === genre 
                  ? "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90" 
                  : "hover:bg-primary/10 border-primary/30"
                }
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-8 px-4">
        <div className="container mx-auto">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8 bg-white/50 backdrop-blur-sm">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="trending">Топ</TabsTrigger>
              <TabsTrigger value="new">Новинки</TabsTrigger>
              <TabsTrigger value="favorites">Избранное</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {/* Recommendations Section */}
              {recommendedSeries.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <Icon name="Sparkles" size={24} className="mr-2 text-primary" />
                    Рекомендации для вас
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {recommendedSeries.map(show => (
                      <Card key={show.id} className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 overflow-hidden hover:scale-105">
                        <div className="relative">
                          <img 
                            src={show.image} 
                            alt={show.title}
                            className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <Badge className="absolute top-2 left-2 bg-gradient-to-r from-primary to-secondary text-white">
                            <Icon name="Heart" size={12} className="mr-1" />
                            Для вас
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-bold text-lg mb-2">{show.title}</h4>
                          <div className="flex items-center gap-2 mb-2">
                            {renderStars(show.rating)}
                            <span className="text-sm font-semibold text-yellow-600">{show.rating}</span>
                          </div>
                          <Badge className="mb-2">{show.genre}</Badge>
                          <Button 
                            size="sm" 
                            className="w-full bg-gradient-to-r from-primary to-secondary"
                            onClick={() => updateWatchProgress(show.id, 1, 1, 0)}
                          >
                            <Icon name="Play" size={14} className="mr-2" />
                            Начать просмотр
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Separator className="mb-8" />
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSeries.map(show => (
                  <Card key={show.id} className="group hover:shadow-2xl transition-all duration-300 bg-white/70 backdrop-blur-sm border-white/30 overflow-hidden hover:scale-105">
                    <div className="relative">
                      <img 
                        src={show.image} 
                        alt={show.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {show.isNew && (
                          <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white">
                            <Icon name="Sparkles" size={14} className="mr-1" />
                            Новинка
                          </Badge>
                        )}
                        {show.isTrending && (
                          <Badge className="bg-gradient-to-r from-red-400 to-pink-500 text-white">
                            <Icon name="TrendingUp" size={14} className="mr-1" />
                            Топ
                          </Badge>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleFavorite(show.id)}
                        className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm border-white/30 hover:bg-white"
                      >
                        <Icon 
                          name="Heart" 
                          size={16} 
                          className={favorites.includes(show.id) ? 'text-red-500 fill-current' : 'text-gray-500'}
                        />
                      </Button>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{show.title}</h3>
                        <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-secondary/10">
                          {show.year}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        {renderStars(show.rating)}
                        <span className="text-lg font-semibold text-yellow-600">{show.rating}</span>
                        <span className="text-gray-500">({show.reviews.length} отзыва)</span>
                      </div>
                      
                      <Badge className="mb-3 bg-gradient-to-r from-secondary/20 to-accent/20 text-secondary-foreground">
                        {show.genre}
                      </Badge>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">{show.description}</p>
                      
                      {/* Watch Progress */}
                      {(() => {
                        const watchProgress = userProfile.watchHistory.find(h => h.seriesId === show.id);
                        return watchProgress ? (
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                              <span>Сезон {watchProgress.seasonNumber}, Эпизод {watchProgress.episodeNumber}</span>
                              <span>{watchProgress.progress}%</span>
                            </div>
                            <Progress value={watchProgress.progress} className="h-2" />
                          </div>
                        ) : null;
                      })()}
                      
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                          onClick={() => {
                            const watchedEpisode = userProfile.watchHistory.find(h => h.seriesId === show.id);
                            const nextEpisode = watchedEpisode ? watchedEpisode.episodeNumber + 1 : 1;
                            const season = watchedEpisode ? watchedEpisode.seasonNumber : 1;
                            updateWatchProgress(show.id, nextEpisode, season, Math.floor(Math.random() * 100));
                          }}
                        >
                          <Icon name="Play" size={16} className="mr-2" />
                          {userProfile.watchHistory.find(h => h.seriesId === show.id) ? 'Продолжить' : 'Смотреть'}
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="hover:bg-primary/10" onClick={() => setSelectedSeries(show)}>
                              <Icon name="Info" size={16} />
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                      </div>
                      
                      {/* Reviews Preview */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Icon name="MessageCircle" size={16} className="mr-2" />
                          Последние отзывы
                        </h4>
                        {show.reviews.slice(0, 2).map(review => (
                          <div key={review.id} className="mb-2 p-2 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-sm">{review.author}</span>
                              <div className="flex items-center gap-1">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2">{review.text}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trending">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSeries.filter(show => show.isTrending).map(show => (
                  <Card key={show.id} className="group hover:shadow-2xl transition-all duration-300 bg-white/70 backdrop-blur-sm border-white/30 overflow-hidden hover:scale-105">
                    <div className="relative">
                      <img 
                        src={show.image} 
                        alt={show.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-400 to-pink-500 text-white">
                        <Icon name="TrendingUp" size={14} className="mr-1" />
                        Топ #{filteredSeries.filter(s => s.isTrending).indexOf(show) + 1}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{show.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        {renderStars(show.rating)}
                        <span className="text-lg font-semibold text-yellow-600">{show.rating}</span>
                      </div>
                      <p className="text-gray-600 mb-4">{show.description}</p>
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                        onClick={() => {
                          const watchedEpisode = userProfile.watchHistory.find(h => h.seriesId === show.id);
                          const nextEpisode = watchedEpisode ? watchedEpisode.episodeNumber + 1 : 1;
                          const season = watchedEpisode ? watchedEpisode.seasonNumber : 1;
                          updateWatchProgress(show.id, nextEpisode, season, Math.floor(Math.random() * 100));
                        }}
                      >
                        <Icon name="Play" size={16} className="mr-2" />
                        {userProfile.watchHistory.find(h => h.seriesId === show.id) ? 'Продолжить' : 'Смотреть'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="new">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSeries.filter(show => show.isNew).map(show => (
                  <Card key={show.id} className="group hover:shadow-2xl transition-all duration-300 bg-white/70 backdrop-blur-sm border-white/30 overflow-hidden hover:scale-105">
                    <div className="relative">
                      <img 
                        src={show.image} 
                        alt={show.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white">
                        <Icon name="Sparkles" size={14} className="mr-1" />
                        Новинка {show.year}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{show.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        {renderStars(show.rating)}
                        <span className="text-lg font-semibold text-yellow-600">{show.rating}</span>
                      </div>
                      <p className="text-gray-600 mb-4">{show.description}</p>
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                        onClick={() => {
                          const watchedEpisode = userProfile.watchHistory.find(h => h.seriesId === show.id);
                          const nextEpisode = watchedEpisode ? watchedEpisode.episodeNumber + 1 : 1;
                          const season = watchedEpisode ? watchedEpisode.seasonNumber : 1;
                          updateWatchProgress(show.id, nextEpisode, season, Math.floor(Math.random() * 100));
                        }}
                      >
                        <Icon name="Play" size={16} className="mr-2" />
                        {userProfile.watchHistory.find(h => h.seriesId === show.id) ? 'Продолжить' : 'Смотреть'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="favorites">
              <div className="text-center py-12">
                {favorites.length === 0 ? (
                  <div className="max-w-md mx-auto">
                    <Icon name="Heart" size={64} className="text-gray-300 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-600 mb-2">Избранное пусто</h3>
                    <p className="text-gray-500 mb-6">Добавьте сериалы в избранное, нажав на сердечко</p>
                    <Button 
                      onClick={() => setSelectedGenre('Все')}
                      className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                    >
                      Смотреть все сериалы
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {series.filter(show => favorites.includes(show.id)).map(show => (
                      <Card key={show.id} className="group hover:shadow-2xl transition-all duration-300 bg-white/70 backdrop-blur-sm border-white/30 overflow-hidden hover:scale-105">
                        <div className="relative">
                          <img 
                            src={show.image} 
                            alt={show.title}
                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-400 to-pink-500 text-white">
                            <Icon name="Heart" size={14} className="mr-1 fill-current" />
                            Избранное
                          </Badge>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-2">{show.title}</h3>
                          <div className="flex items-center gap-2 mb-3">
                            {renderStars(show.rating)}
                            <span className="text-lg font-semibold text-yellow-600">{show.rating}</span>
                          </div>
                          <p className="text-gray-600 mb-4">{show.description}</p>
                          <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                            <Icon name="Play" size={16} className="mr-2" />
                            Смотреть
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 px-4 mt-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-xl">
                  <Icon name="Play" className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-bold">СериалМастер</h3>
              </div>
              <p className="text-gray-300">Лучшие сериалы с рейтингами и отзывами пользователей</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Разделы</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Главная</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Сериалы</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Жанры</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Топ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Жанры</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Драма</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Комедия</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Фантастика</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Триллер</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Связь</h4>
              <div className="flex gap-4">
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-white hover:text-gray-900">
                  <Icon name="Mail" size={16} />
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-white hover:text-gray-900">
                  <Icon name="Phone" size={16} />
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-white hover:text-gray-900">
                  <Icon name="MessageCircle" size={16} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 СериалМастер. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Series Detail Modal */}
      {selectedSeries && (
        <Dialog open={!!selectedSeries} onOpenChange={() => setSelectedSeries(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-4">{selectedSeries.title}</DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <img 
                  src={selectedSeries.image} 
                  alt={selectedSeries.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                
                {selectedSeries.trailerUrl && (
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center">
                      <Icon name="Play" size={16} className="mr-2" />
                      Трейлер
                    </h4>
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <iframe
                        src={selectedSeries.trailerUrl}
                        className="w-full h-full"
                        allowFullScreen
                        title={`Трейлер ${selectedSeries.title}`}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {renderStars(selectedSeries.rating)}
                    <span className="text-lg font-semibold text-yellow-600">{selectedSeries.rating}</span>
                  </div>
                  <Badge className="bg-gradient-to-r from-secondary/20 to-accent/20">
                    {selectedSeries.genre}
                  </Badge>
                  <Badge variant="secondary">{selectedSeries.year}</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Продолжительность:</span>
                    <p>{selectedSeries.duration}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Сезонов:</span>
                    <p>{selectedSeries.seasons}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Эпизодов:</span>
                    <p>{selectedSeries.episodes}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Режиссер:</span>
                    <p>{selectedSeries.director}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Описание</h4>
                  <p className="text-gray-600 leading-relaxed">{selectedSeries.fullDescription}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">В ролях</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeries.cast?.map((actor, index) => (
                      <Badge key={index} variant="outline">{actor}</Badge>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex gap-2">
                  <Button className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                    <Icon name="Play" size={16} className="mr-2" />
                    Смотреть
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toggleFavorite(selectedSeries.id)}
                    className={favorites.includes(selectedSeries.id) ? 'text-red-500 border-red-200' : ''}
                  >
                    <Icon 
                      name="Heart" 
                      size={16} 
                      className={favorites.includes(selectedSeries.id) ? 'fill-current' : ''}
                    />
                  </Button>
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div>
              <h4 className="font-semibold mb-4 flex items-center">
                <Icon name="MessageCircle" size={16} className="mr-2" />
                Отзывы зрителей ({selectedSeries.reviews.length})
              </h4>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {selectedSeries.reviews.map(review => (
                  <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>{review.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{review.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* User Profile Modal */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Личный кабинет</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="text-lg">{userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{userProfile.name}</h3>
                <p className="text-gray-600">{userProfile.email}</p>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-semibold mb-4 flex items-center">
                <Icon name="Clock" size={16} className="mr-2" />
                История просмотров
              </h4>
              <div className="space-y-3">
                {userProfile.watchHistory.map((item, index) => {
                  const seriesData = series.find(s => s.id === item.seriesId);
                  return (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <img 
                        src={seriesData?.image} 
                        alt={seriesData?.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium">{seriesData?.title}</h5>
                        <p className="text-sm text-gray-600">
                          Сезон {item.seasonNumber}, Эпизод {item.episodeNumber}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={item.progress} className="flex-1 h-2" />
                          <span className="text-xs text-gray-500">{item.progress}%</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.watchedAt}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-semibold mb-4 flex items-center">
                <Icon name="Settings" size={16} className="mr-2" />
                Предпочтения
              </h4>
              <div className="flex flex-wrap gap-2">
                {userProfile.preferences.map((pref, index) => (
                  <Badge key={index} className="bg-gradient-to-r from-primary/20 to-secondary/20">
                    {pref}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                <Icon name="Edit" size={16} className="mr-2" />
                Редактировать профиль
              </Button>
              <Button variant="outline">
                <Icon name="LogOut" size={16} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;