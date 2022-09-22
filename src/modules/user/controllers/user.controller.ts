import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import accessProfileConstants from 'src/config/constants/accessProfile.constants';
import { AccessControl } from 'src/utils/decorators/accessControl.decorator';
import { UserCreateDto } from '../dto/userCreate.dto';
import { UpdateModuleDto } from '../dto/userUpdate.dto';
import { UserService } from '../services/user.service';

@ApiTags('user')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly moduleService: UserService) {}

  @Post()
  @AccessControl(accessProfileConstants.PERMISSIONS.CREATE_USER)
  @ApiOperation({ summary: 'User register' })
  @ApiCreatedResponse({
    description: 'User created',
    type: UserCreateDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: UserCreateDto })
  create(@Body() createModuleDto: UserCreateDto) {
    return this.moduleService.create(createModuleDto);
  }

  @Get()
  @AccessControl(accessProfileConstants.PERMISSIONS.LIST_USER)
  @ApiOperation({ summary: 'List users' })
  @ApiOkResponse({
    description: 'List of users',
    type: UserCreateDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findAll(
    @Query('skip') skip: string,
    @Query('take') take: string,
    @Query('filter') filter: string,
  ) {
    return this.moduleService.findAll({
      skip: Number(skip),
      take: Number(take),
      filter: filter,
    });
  }

  @Get(':id')
  @AccessControl(accessProfileConstants.PERMISSIONS.LIST_USER)
  @ApiOperation({ summary: 'Get an user' })
  @ApiOkResponse({ description: 'Get user', type: UserCreateDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findOne(@Param('id') id: number) {
    return this.moduleService.findOne(id);
  }

  @Put(':id')
  @AccessControl(accessProfileConstants.PERMISSIONS.EDIT_USER)
  @ApiOperation({ summary: 'Edit an user' })
  @ApiOkResponse({
    description: 'User updated successfully',
    type: UserCreateDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  update(@Param('id') id: number, @Body() updateModuleDto: UpdateModuleDto) {
    return this.moduleService.update(id, updateModuleDto);
  }

  @Delete(':id')
  @AccessControl(accessProfileConstants.PERMISSIONS.REMOVE_USER)
  @ApiOperation({ summary: 'Delete an user' })
  @ApiOkResponse({
    description: 'User deleted successfully',
    type: UserCreateDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  remove(@Param('id') id: number) {
    return this.moduleService.remove(id);
  }
}
