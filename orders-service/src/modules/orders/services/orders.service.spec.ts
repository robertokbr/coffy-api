import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from '../../../modules/items/services/items.service';
import { WebsocketGatewayProvider } from '../../../modules/common/providers/websocket-gateway.provider';
import { OrderItemsDto } from '../dto/order-items.dto';
import { UserDto } from '../dto/user.dto';
import { StateCode } from '../enums/order-state.enum';
import { OrdersRepository } from '../repositories/orders.repository';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;

  const mockUser = {
    id: `1`,
    name: 'John Doe',
    createdAt: new Date(),
  } as UserDto;

  const mockItems = [
    {
      id: 1,
      amount: 1,
    }
  ];

  const mockOrder = {
    id: 1,
    createdAt: new Date(),
    customer: mockUser,
    stateCode: StateCode.WAITING,
    items: mockItems as OrderItemsDto[],
  };

  const mockOrdersRepository = {
    create: async (_data) => Promise.resolve(
      mockOrder,
    ),
    find: async (_user, _query) => Promise.resolve([
      mockOrder,
    ]),
    save: async (updateOrderDto, _id) => Promise.resolve(
      Object.assign({ ...mockOrder }, updateOrderDto),
    ),
  };

  const mockWebSocketGatewayProvider = {
    emitOrderCreatedEvent: (_data) => null,
    emitOrderUpdatedEvent: (_data) => null,
  }

  const mockItemsService = {
    findByIds: async (_ids) => Promise.resolve(
      mockItems,
    ),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: OrdersRepository,
          useValue: mockOrdersRepository,
        },
        {
          provide: WebsocketGatewayProvider,
          useValue: mockWebSocketGatewayProvider,
        },
        {
          provide: ItemsService,
          useValue: mockItemsService,
        }
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  describe('create', () => {
    it('should be able to create an order', async () => {
      const createOrderSpy = jest.spyOn(mockOrdersRepository, 'create');
      const findItemByIdsSpy = jest.spyOn(mockItemsService, 'findByIds');

      const emitOrderCreatedEventSpy = jest.spyOn(
        mockWebSocketGatewayProvider, 
        'emitOrderCreatedEvent'
      );
      
      const order = await service.create({
        customer: mockUser,
        stateCode: StateCode.WAITING,
        items: mockItems
      });

      expect(findItemByIdsSpy).toHaveBeenCalled();
      expect(createOrderSpy).toHaveBeenCalled();
      expect(emitOrderCreatedEventSpy).toHaveBeenCalled();
      expect(order).toBeDefined();
    });

    it('should not be able to create an order if there is some invalid item id', async () => {
      jest.spyOn(mockItemsService, 'findByIds').mockImplementationOnce(() => 
      Promise.resolve([])
    );

    await expect(service.create({
      customer: mockUser,
      stateCode: StateCode.WAITING,
      items: mockItems
    })).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should be able to find all order', async () => {
      const findAllOrderSpy = jest.spyOn(mockOrdersRepository, 'find');
      const orders = await service.findAll({});

      expect(findAllOrderSpy).toHaveBeenCalled();
      expect(orders).toBeDefined();
      expect(orders).toHaveLength(1);
    });
  });

  describe('update', () => {
    it('should be able to update an order', async () => {
      const saveOrderSpy = jest.spyOn(mockOrdersRepository, 'save');
      const emitOrderUpdatedEventSpy = jest.spyOn(
        mockWebSocketGatewayProvider,
        'emitOrderUpdatedEvent'
      );
      
      const orders = await service.update({ 
        stateCode: StateCode.DONE 
      }, 1);

      expect(saveOrderSpy).toHaveBeenCalled();
      expect(emitOrderUpdatedEventSpy).toHaveBeenCalled();
      expect(orders).toBeDefined();
      expect(orders.stateCode).toBe(StateCode.DONE);
    });

    it('should not be able to update an order if it not exists', async () => {
      jest.spyOn(mockOrdersRepository, 'find').mockImplementationOnce(() => {
        return Promise.resolve([]);
      });

      
      await expect(service.update({ 
        stateCode: StateCode.DONE 
      }, 1)).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
