// import { ClientOption, TlsOptions, _initializeOption } from "./option"
// import * as _ from 'lodash'
// import { ProducerOption } from "producer/option"
// import { Producer } from "producer/producer"

// export class Client {
//   readonly clientOptions: ClientOption
//   readonly tlsOptions: TlsOptions | undefined

//   constructor(clientOptions: ClientOption) {
//     this.clientOptions = _initializeOption(_.cloneDeep(clientOptions))
//   }

//   createProducer(producerOption: ProducerOption) {
//     return new Producer(producerOption, this)

//   }
// }
