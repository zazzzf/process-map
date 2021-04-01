import mockjs from 'mockjs'

const {Random} = mockjs
const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };
export default {
    "GET /api/processmap/data": (req:any, res: any) => {
        setTimeout(() => {
            const data = mockjs.mock({
                status: 200,
                'data|5-10': [
                        {
                          'stepCode|+1': 10100101,
                          'stepName': '@natural(1, 1000) 班',
                          'data|0-10': [
                            {
                              'status': '3',
                              'stepCode|+1': 20200101,
                              'stepName': '@cname',
                              'rankType': 1,
                              'data|0-10': [
                                {
                                  'stepCode|+1': 30300101,
                                  'stepName': '@cname',
                                  'rankType': 1,
                                }]
                            },
                            {
                              'status': '3',
                              'stepCode|+1': 20200101,
                              'stepName': '@cname',
                              'rankType|1-2': 1,
                              'data|0-10': [
                                {
                                  'stepCode|+1': 30300101,
                                  'stepName': '@cname',
                                  'rankType|1-2': 1,
                                }]
                            }
                      ]
                    }
                ],
                message: 'success'
            })
            res.json(data)
        })
    }
}