import { Test, TestingModule } from "@nestjs/testing";
import { ItemsRepository } from "../repositories/items.repository";
import { ItemsService } from "./items.service";

describe('ItemsService', () => {
  let service: ItemsService;

  const mockItem = {
    id: 1,
    name: 'Cake',
    description: 'One piece of cake',
    price: 1000,
    imageURL: 'image.png',
    isAvailable: true,
    createdAt: '2022-07-16T01:51:54.218Z',
    updatedAt: '2022-07-16T01:51:54.218Z'
  }

  const mockItemsRepository = {
    find: async (_user, _query) => Promise.resolve([
      mockItem,
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: ItemsRepository,
          useValue: mockItemsRepository,
        }
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should be able to find all item', async () => {
      const findAllItemSpy = jest.spyOn(mockItemsRepository, 'find');

      const items = await service.findAll();

      expect(findAllItemSpy).toHaveBeenCalled();
      expect(items).toEqual([mockItem]);
    });
  });
});
