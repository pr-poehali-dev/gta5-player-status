import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';

interface Player {
  id: number;
  nickname: string;
  status: string;
  faction: string;
  role: string;
  playtime: string;
}

interface PlayersTabProps {
  players: Player[];
  onUpdatePlayerStatus: (playerId: number, newStatus: string) => void;
  onAddPlayer: (player: Omit<Player, 'id' | 'playtime'>) => void;
}

const PlayersTab = ({ players, onUpdatePlayerStatus, onAddPlayer }: PlayersTabProps) => {
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    nickname: '',
    faction: '',
    role: '',
    status: 'offline'
  });

  const handleAddPlayer = () => {
    if (newPlayer.nickname && newPlayer.faction && newPlayer.role) {
      onAddPlayer(newPlayer);
      setNewPlayer({ nickname: '', faction: '', role: '', status: 'offline' });
      setIsAddPlayerOpen(false);
    }
  };

  const getStatusBadge = (status: string, playerId: number) => {
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

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Badge className={`${styles[status as keyof typeof styles]} text-xs cursor-pointer hover:opacity-80 transition-opacity`}>
            {labels[status as keyof typeof labels]}
            <Icon name="ChevronDown" size={12} className="ml-1" />
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onUpdatePlayerStatus(playerId, 'online')}>
            <Icon name="Circle" className="w-2 h-2 mr-2 fill-green-500 text-green-500" />
            Онлайн
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onUpdatePlayerStatus(playerId, 'afk')}>
            <Icon name="Clock" className="w-3 h-3 mr-2 text-yellow-500" />
            АФК
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onUpdatePlayerStatus(playerId, 'offline')}>
            <Icon name="Circle" className="w-2 h-2 mr-2 fill-red-500 text-red-500" />
            Офлайн
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
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
              <Button onClick={handleAddPlayer} className="gta-gradient text-white">
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
    </div>
  );
};

export default PlayersTab;