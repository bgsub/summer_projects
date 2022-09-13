import 'reflect-metadata';
import 'module-alias/register';
import { Server } from './server';
import { Container } from 'typedi';

const server: Server = Container.get(Server);
server.init();

