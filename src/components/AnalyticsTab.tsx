import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Faction {
  name: string;
  leader: string;
  members: number;
  color: string;
}

interface AnalyticsTabProps {
  factions: Faction[];
}

const AnalyticsTab = ({ factions }: AnalyticsTabProps) => {
  return (
    <div className="space-y-6 animate-fadeIn">
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
    </div>
  );
};

export default AnalyticsTab;