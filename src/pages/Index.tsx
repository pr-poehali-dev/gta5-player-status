import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    nickname: '',
    faction: '',
    role: '',
    status: 'offline'
  });

  // Mock данные для демонстрации
  const [serverStats, setServerStats] = useState({
    totalPlayers: 247,
    onlinePlayers: 189,
    afkPlayers: 32,
    offlinePlayers: 26,
    uptime: '7д 14ч 32м'
  });

  const [players, setPlayers] = useState([
    { id: 1, nickname: 'ShadowKiller', status: 'online', faction: 'Полиция', role: 'Лейтенант', playtime: '45ч 12м' },
    { id: 2, nickname: 'NightRider', status: 'afk', faction: 'Мафия', role: 'Советник', playtime: '123ч 45м' },
    { id: 3, nickname: 'StreetRacer', status: 'offline', faction: 'Автосалон', role: 'Менеджер', playtime: '89ч 23м' },
    { id: 4, nickname: 'CityGuard', status: 'online', faction: 'Полиция', role: 'Капитан', playtime: '156ч 11м' },
    { id: 5, nickname: 'BusinessMan', status: 'online', faction: 'Мэрия', role: 'Мэр', playtime: '201ч 33м' }
  ]);

  const factions = [
    { name: 'Полиция', leader: 'CityGuard', members: 45, color: 'blue' },
    { name: 'Мафия', leader: 'NightRider', members: 32, color: 'red' },
    { name: 'Мэрия', leader: 'BusinessMan', members: 28, color: 'green' },
    { name: 'Автосалон', leader: 'StreetRacer', members: 19, color: 'yellow' }
  ];

  const updatePlayerStatus = (playerId: number, newStatus: string) => {
    setPlayers(prev => prev.map(player => 
      player.id === playerId ? { ...player, status: newStatus } : player
    ));
    
    // Обновляем статистику сервера
    const updatedPlayers = players.map(player => 
      player.id === playerId ? { ...player, status: newStatus } : player
    );
    
    const onlineCount = updatedPlayers.filter(p => p.status === 'online').length;
    const afkCount = updatedPlayers.filter(p => p.status === 'afk').length;
    const offlineCount = updatedPlayers.filter(p => p.status === 'offline').length;
    
    setServerStats(prev => ({
      ...prev,
      onlinePlayers: onlineCount,
      afkPlayers: afkCount,
      offlinePlayers: offlineCount
    }));
  };

  const addNewPlayer = () => {
    if (newPlayer.nickname && newPlayer.faction && newPlayer.role) {
      const newId = Math.max(...players.map(p => p.id)) + 1;
      const playerToAdd = {
        ...newPlayer,
        id: newId,
        playtime: '0ч 0м'
      };
      
      setPlayers(prev => [...prev, playerToAdd]);
      setServerStats(prev => ({ ...prev, totalPlayers: prev.totalPlayers + 1 }));
      
      // Сбрасываем форму
      setNewPlayer({ nickname: '', faction: '', role: '', status: 'offline' });
      setIsAddPlayerOpen(false);
    }
  };

  const getStatusBadge = (status: string, playerId?: number) => {
    const styles = {
      online: 'status-online',
      afk: 'status-afk',
      offline: 'status-offline'
    };
    
    const labels = {
      online: 'Онлайн',
      afk: 'АФК',
      offline: 'Офлайн'
    };

    if (playerId) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Badge className={`${styles[status as keyof typeof styles]} text-xs cursor-pointer hover:opacity-80 transition-opacity`}>
              {labels[status as keyof typeof labels]}
              <Icon name="ChevronDown" size={12} className="ml-1" />
            </Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => updatePlayerStatus(playerId, 'online')}>
              <Icon name="Circle" className="w-2 h-2 mr-2 fill-green-500 text-green-500" />
              Онлайн
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updatePlayerStatus(playerId, 'afk')}>
              <Icon name="Clock" className="w-3 h-3 mr-2 text-yellow-500" />
              АФК
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updatePlayerStatus(playerId, 'offline')}>
              <Icon name="Circle" className="w-2 h-2 mr-2 fill-red-500 text-red-500" />
              Офлайн
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Badge className={`${styles[status as keyof typeof styles]} text-xs`}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg gta-gradient flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">GTA 5 Admin Panel</h1>
                <p className="text-muted-foreground text-sm">Управление сервером и игроками</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="px-3 py-1">
                <Icon name="Activity" size={16} className="mr-2" />
                Сервер активен
              </Badge>
              <Button variant="outline" size="sm">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-max lg:grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Icon name="LayoutDashboard" size={16} />
              Панель
            </TabsTrigger>
            <TabsTrigger value="players" className="flex items-center gap-2">
              <Icon name="Users" size={16} />
              Игроки
            </TabsTrigger>
            <TabsTrigger value="factions" className="flex items-center gap-2">
              <Icon name="Shield" size={16} />
              Фракции
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Icon name="BarChart3" size={16} />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Icon name="UserPlus" size={16} />
              Пользователи
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Icon name="Cog" size={16} />
              Система
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="card-gradient hover-scale">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Всего игроков</CardTitle>
                  <Icon name="Users" className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{serverStats.totalPlayers}</div>
                  <p className="text-xs text-muted-foreground">+12 за сегодня</p>
                </CardContent>
              </Card>

              <Card className="card-gradient hover-scale">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Онлайн</CardTitle>
                  <Icon name="Activity" className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">{serverStats.onlinePlayers}</div>
                  <Progress value={76} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="card-gradient hover-scale">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AFK</CardTitle>
                  <Icon name="Clock" className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-500">{serverStats.afkPlayers}</div>
                  <p className="text-xs text-muted-foreground">13% от онлайна</p>
                </CardContent>
              </Card>

              <Card className="card-gradient hover-scale">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Аптайм</CardTitle>
                  <Icon name="Server" className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-primary">{serverStats.uptime}</div>
                  <p className="text-xs text-muted-foreground">99.8% стабильность</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={20} />
                    Активность сервера
                  </CardTitle>
                  <CardDescription>Статистика игроков за последние 24 часа</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Пиковый онлайн</span>
                      <span className="font-semibold text-primary">234 игрока</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Минимальный онлайн</span>
                      <span className="font-semibold">89 игроков</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Средний онлайн</span>
                      <span className="font-semibold">156 игроков</span>
                    </div>
                    <Progress value={68} className="mt-4" />
                  </div>
                </CardContent>
              </Card>

              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="AlertTriangle" size={20} />
                    Системные уведомления
                  </CardTitle>
                  <CardDescription>Важные события сервера</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <Icon name="Info" size={16} className="text-blue-500 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium">Плановое обновление</p>
                        <p className="text-muted-foreground">Сегодня в 03:00 по МСК</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <Icon name="Shield" size={16} className="text-green-500 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium">Новый лидер фракции</p>
                        <p className="text-muted-foreground">CityGuard назначен главой Полиции</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Players Tab */}
          <TabsContent value="players" className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Управление игроками</h2>
              <Dialog open={isAddPlayerOpen} onOpenChange={setIsAddPlayerOpen}>
                <DialogTrigger asChild>
                  <Button className="gta-gradient text-white">
                    <Icon name="UserPlus" size={16} className="mr-2" />
                    Добавить игрока
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Добавить нового игрока</DialogTitle>
                    <DialogDescription>
                      Введите данные для создания нового игрока в системе.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="nickname" className="text-right">
                        Никнейм
                      </Label>
                      <Input
                        id="nickname"
                        value={newPlayer.nickname}
                        onChange={(e) => setNewPlayer({...newPlayer, nickname: e.target.value})}
                        className="col-span-3"
                        placeholder="Введите никнейм"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="faction" className="text-right">
                        Фракция
                      </Label>
                      <Select value={newPlayer.faction} onValueChange={(value) => setNewPlayer({...newPlayer, faction: value})}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Выберите фракцию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Полиция">Полиция</SelectItem>
                          <SelectItem value="Мафия">Мафия</SelectItem>
                          <SelectItem value="Мэрия">Мэрия</SelectItem>
                          <SelectItem value="Автосалон">Автосалон</SelectItem>
                          <SelectItem value="Больница">Больница</SelectItem>
                          <SelectItem value="СМИ">СМИ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">
                        Роль
                      </Label>
                      <Input
                        id="role"
                        value={newPlayer.role}
                        onChange={(e) => setNewPlayer({...newPlayer, role: e.target.value})}
                        className="col-span-3"
                        placeholder="Введите роль"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="status" className="text-right">
                        Статус
                      </Label>
                      <Select value={newPlayer.status} onValueChange={(value) => setNewPlayer({...newPlayer, status: value})}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">Онлайн</SelectItem>
                          <SelectItem value="afk">АФК</SelectItem>
                          <SelectItem value="offline">Офлайн</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddPlayerOpen(false)}>
                      Отмена
                    </Button>
                    <Button onClick={addNewPlayer} className="gta-gradient text-white">
                      Добавить игрока
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Список игроков</CardTitle>
                <CardDescription>Текущий статус всех зарегистрированных игроков</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {players.map((player) => (
                    <div key={player.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full gta-gradient flex items-center justify-center">
                          <Icon name="User" size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">{player.nickname}</p>
                          <p className="text-sm text-muted-foreground">{player.faction} • {player.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm">{player.playtime}</p>
                          <p className="text-xs text-muted-foreground">наиграно</p>
                        </div>
                        {getStatusBadge(player.status, player.id)}
                        <Button variant="outline" size="sm">
                          <Icon name="MoreHorizontal" size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Factions Tab */}
          <TabsContent value="factions" className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Управление фракциями</h2>
              <Button className="gta-gradient text-white">
                <Icon name="Plus" size={16} className="mr-2" />
                Создать фракцию
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {factions.map((faction, index) => (
                <Card key={index} className="card-gradient hover-scale">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-${faction.color}-500`}></div>
                        {faction.name}
                      </CardTitle>
                      <Badge variant="outline">{faction.members} участников</Badge>
                    </div>
                    <CardDescription>Лидер: {faction.leader}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Активность</p>
                        <Progress value={Math.random() * 100} className="w-24" />
                      </div>
                      <Button variant="outline" size="sm">
                        <Icon name="Settings" size={16} className="mr-2" />
                        Управление
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold">Аналитика и статистика</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="card-gradient lg:col-span-2">
                <CardHeader>
                  <CardTitle>График активности</CardTitle>
                  <CardDescription>Онлайн игроков за последнюю неделю</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                    <div className="text-center">
                      <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">График будет здесь</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="card-gradient">
                  <CardHeader>
                    <CardTitle className="text-lg">Топ фракций</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {factions.slice(0, 3).map((faction, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{faction.name}</span>
                          <Badge variant="secondary">{faction.members}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-gradient">
                  <CardHeader>
                    <CardTitle className="text-lg">Статистика</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Новых игроков</span>
                        <span className="font-semibold text-green-500">+24</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Банов сегодня</span>
                        <span className="font-semibold text-red-500">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Среднее время игры</span>
                        <span className="font-semibold">3.4ч</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Управление пользователями</h2>
              <Button className="gta-gradient text-white">
                <Icon name="UserPlus" size={16} className="mr-2" />
                Добавить пользователя
              </Button>
            </div>

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Права доступа</CardTitle>
                <CardDescription>Управление ролями и разрешениями</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Icon name="Lock" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Раздел управления пользователями</p>
                  <p className="text-sm text-muted-foreground mt-2">Здесь будет интерфейс для управления ролями</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold">Системные настройки</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle>Конфигурация сервера</CardTitle>
                  <CardDescription>Основные настройки</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Максимум игроков</span>
                      <Badge variant="outline">250</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Автосохранение</span>
                      <Badge className="bg-green-500">Включено</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Режим отладки</span>
                      <Badge variant="secondary">Отключен</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle>Безопасность</CardTitle>
                  <CardDescription>Настройки защиты</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Античит</span>
                      <Badge className="bg-green-500">Активен</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Логирование</span>
                      <Badge className="bg-green-500">Включено</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>DDoS защита</span>
                      <Badge className="bg-green-500">Активна</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;