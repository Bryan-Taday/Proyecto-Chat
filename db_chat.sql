SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE public.tbl_chats (
    id_chat integer NOT NULL,
    "fk_userE" integer NOT NULL,
    "fk_userR" integer NOT NULL
);

ALTER TABLE public.tbl_chats OWNER TO postgres;

CREATE SEQUENCE public.tbl_chats_id_chat_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.tbl_chats_id_chat_seq OWNER TO postgres;

ALTER SEQUENCE public.tbl_chats_id_chat_seq OWNED BY public.tbl_chats.id_chat;

CREATE TABLE public.tbl_messages (
    id_message integer NOT NULL,
    mensaje text NOT NULL,
    fk_id_chat integer NOT NULL,
    orden integer NOT NULL
);

ALTER TABLE public.tbl_messages OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16662)
-- Name: tbl_messages_id_message_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_messages_id_message_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_messages_id_message_seq OWNER TO postgres;

--
-- TOC entry 2858 (class 0 OID 0)
-- Dependencies: 207
-- Name: tbl_messages_id_message_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tbl_messages_id_message_seq OWNED BY public.tbl_messages.id_message;


--
-- TOC entry 208 (class 1259 OID 16692)
-- Name: tbl_messages_orden_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_messages_orden_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_messages_orden_seq OWNER TO postgres;

--
-- TOC entry 2859 (class 0 OID 0)
-- Dependencies: 208
-- Name: tbl_messages_orden_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tbl_messages_orden_seq OWNED BY public.tbl_messages.orden;


--
-- TOC entry 202 (class 1259 OID 16623)
-- Name: tbl_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_users (
    id_user integer NOT NULL,
    name text NOT NULL,
    lastname text NOT NULL,
    "user" text NOT NULL
);


ALTER TABLE public.tbl_users OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16635)
-- Name: tbl_users_id_user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_users_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_users_id_user_seq OWNER TO postgres;

--
-- TOC entry 2860 (class 0 OID 0)
-- Dependencies: 203
-- Name: tbl_users_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tbl_users_id_user_seq OWNED BY public.tbl_users.id_user;


--
-- TOC entry 2704 (class 2604 OID 16652)
-- Name: tbl_chats id_chat; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_chats ALTER COLUMN id_chat SET DEFAULT nextval('public.tbl_chats_id_chat_seq'::regclass);


--
-- TOC entry 2705 (class 2604 OID 16664)
-- Name: tbl_messages id_message; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_messages ALTER COLUMN id_message SET DEFAULT nextval('public.tbl_messages_id_message_seq'::regclass);


--
-- TOC entry 2706 (class 2604 OID 16694)
-- Name: tbl_messages orden; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_messages ALTER COLUMN orden SET DEFAULT nextval('public.tbl_messages_orden_seq'::regclass);


--
-- TOC entry 2703 (class 2604 OID 16637)
-- Name: tbl_users id_user; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_users ALTER COLUMN id_user SET DEFAULT nextval('public.tbl_users_id_user_seq'::regclass);


--
-- TOC entry 2847 (class 0 OID 16647)
-- Dependencies: 204
-- Data for Name: tbl_chats; Type: TABLE DATA; Schema: public; Owner: postgres
--

Insert into public.tbl_chats (id_chat, "fk_userE", "fk_userR")
Values (1,	1, 2),
        (2,	2, 1),
        (3,	1, 3),
        (4,	3, 1),
        (5,	1, 4),
        (6,	4, 1),
        (7,	7, 1),
        (8,	1, 7);

Insert into public.tbl_messages (id_message, mensaje, fk_id_chat, orden)
Values (1,	'Hola Naty', 1,	1),
        (2,	'Hola tadinski', 2,	2),
        (3,	'como estas',	2, 3),
        (4,	'bien y tu', 1, 4),
        (5,	'Hola Laura', 3, 5),
        (6,	'q haces', 2, 6),
        (7,	'El proyecto', 1, 7);


--
-- TOC entry 2845 (class 0 OID 16623)
-- Dependencies: 202
-- Data for Name: tbl_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

Insert into public.tbl_users (id_user, name, lastname, "user")
Values (1, 'Bryan', 'Taday', 'BryanT'),
        (2, 'Nataly', 'Vallejo', 'NatyV'),
        (3, 'Laura', 'Romero', 'LauRomero'),
        (4, 'Karen', 'Macias', 'Kmacias'),
        (5, 'Camila', 'Mora', 'CamiMora'),
        (6, 'Angel', 'Ceballos', 'Gokusuper'),
        (7, 'Steven', 'Silva', 'Bestewic');
        
SELECT pg_catalog.setval('public.tbl_chats_id_chat_seq', 8, true);


--
-- TOC entry 2862 (class 0 OID 0)
-- Dependencies: 207
-- Name: tbl_messages_id_message_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_messages_id_message_seq', 7, true);


--
-- TOC entry 2863 (class 0 OID 0)
-- Dependencies: 208
-- Name: tbl_messages_orden_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_messages_orden_seq', 7, true);


--
-- TOC entry 2864 (class 0 OID 0)
-- Dependencies: 203
-- Name: tbl_users_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_users_id_user_seq', 7, true);


--
-- TOC entry 2712 (class 2606 OID 16654)
-- Name: tbl_chats tbl_chats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_chats
    ADD CONSTRAINT tbl_chats_pkey PRIMARY KEY (id_chat);


--
-- TOC entry 2715 (class 2606 OID 16666)
-- Name: tbl_messages tbl_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_messages
    ADD CONSTRAINT tbl_messages_pkey PRIMARY KEY (id_message);


--
-- TOC entry 2708 (class 2606 OID 16639)
-- Name: tbl_users tbl_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_users
    ADD CONSTRAINT tbl_users_pkey PRIMARY KEY (id_user);


--
-- TOC entry 2713 (class 1259 OID 16691)
-- Name: fki_fk_chats; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_chats ON public.tbl_messages USING btree (fk_id_chat);


--
-- TOC entry 2709 (class 1259 OID 16679)
-- Name: fki_fk_user1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_user1 ON public.tbl_chats USING btree ("fk_userE");


--
-- TOC entry 2710 (class 1259 OID 16685)
-- Name: fki_fk_user2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_user2 ON public.tbl_chats USING btree ("fk_userR");


--
-- TOC entry 2718 (class 2606 OID 16686)
-- Name: tbl_messages fk_chats; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_messages
    ADD CONSTRAINT fk_chats FOREIGN KEY (fk_id_chat) REFERENCES public.tbl_chats(id_chat) NOT VALID;


--
-- TOC entry 2716 (class 2606 OID 16674)
-- Name: tbl_chats fk_user1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_chats
    ADD CONSTRAINT fk_user1 FOREIGN KEY ("fk_userE") REFERENCES public.tbl_users(id_user) NOT VALID;


--
-- TOC entry 2717 (class 2606 OID 16680)
-- Name: tbl_chats fk_user2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_chats
    ADD CONSTRAINT fk_user2 FOREIGN KEY ("fk_userR") REFERENCES public.tbl_users(id_user) NOT VALID;


-- Completed on 2020-09-05 18:33:58

--
-- PostgreSQL database dump complete
--

