import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SystemTab = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
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
    </div>
  );
};

export default SystemTab;