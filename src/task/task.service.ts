import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
    private readonly logger = new Logger(TaskService.name);

    // @Cron('0 52 * * * *')
    // myCronTask(){
    //     this.logger.debug('Cron Task Called')
    // }
    // @Cron(CronExpression.EVERY_5_SECONDS)
    // myCronTask(){
    //     this.logger.debug('Cron Task Called')
    // }
    @Interval(5000)
    myIntervalTask(){
        this.logger.debug('Interval Task Called')
    }
    @Timeout(5000)
    myTimeoutTask(){
        this.logger.debug('Timeout Task Called')
    }
}
