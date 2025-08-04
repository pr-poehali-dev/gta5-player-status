import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

import Header from '@/components/Header';
import DashboardTab from '@/components/DashboardTab';
import PlayersTab from '@/components/PlayersTab';
import FactionsTab from '@/components/FactionsTab';
import AnalyticsTab from '@/components/AnalyticsTab';
import UsersTab from '@/components/UsersTab';
import SystemTab from '@/components/SystemTab';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

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

  const addNewPlayer = (newPlayer: { nickname: string; faction: string; role: string; status: string }) => {
    const newId = Math.max(...players.map(p => p.id)) + 1;
    const playerToAdd = {
      ...newPlayer,
      id: newId,
      playtime: '0ч 0м'
    };
    
    setPlayers(prev => [...prev, playerToAdd]);
    setServerStats(prev => ({ ...prev, totalPlayers: prev.totalPlayers + 1 }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

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

          <TabsContent value="dashboard">
            <DashboardTab serverStats={serverStats} />
          </TabsContent>

          <TabsContent value="players">
            <PlayersTab 
              players={players} 
              onUpdatePlayerStatus={updatePlayerStatus}
              onAddPlayer={addNewPlayer}
            />
          </TabsContent>

          <TabsContent value="factions">
            <FactionsTab factions={factions} />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTab factions={factions} />
          </TabsContent>

          <TabsContent value="users">
            <UsersTab />
          </TabsContent>

          <TabsContent value="system">
            <SystemTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;