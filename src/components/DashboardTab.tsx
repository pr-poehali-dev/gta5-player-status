import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface ServerStats {
  totalPlayers: number;
  onlinePlayers: number;
  afkPlayers: number;
  offlinePlayers: number;
  uptime: string;
}

interface DashboardTabProps {
  serverStats: ServerStats;
}

const DashboardTab = ({ serverStats }: DashboardTabProps) => {
  return (
    <div className="space-y-6 animate-fadeIn">
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
    </div>
  );
};

export default DashboardTab;