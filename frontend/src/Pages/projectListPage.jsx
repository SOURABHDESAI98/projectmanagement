import React, { useEffect, useState } from 'react';
import LogoComponent from '../Components/LogoComponent';
import SideNavBar from '../Components/SideNavBar';
import "../styles/projectListPage.css";
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
    Box,
    Input,
    Select,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    Text,
    Card,
    Flex,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    useDisclosure,
} from '@chakra-ui/react';
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { getAllData, searchData, updateProjectStatus } from '../Redux/project/Action';
import { PaginationComponent } from '../Components/PaginationComponent';
import BottomNavbar from '../Components/BottomNavbar';
import setAuthenticationHeader from '../utlility/authenticate';


const ProjectListComponent = () => {
    const dispatch = useDispatch();
    const { data, pageCount } = useSelector(store => store.project);
    const [text, setText] = useState("");
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("pp.ppname");
    const [limit, setLimit] = useState(6);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [placement, setPlacement] = useState('bottom')

    console.log(pageCount);
    console.log(page);

    // -------------------window-size width------------------------//

    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    function getCurrentDimension() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    useEffect(() => {

        let token=localStorage.getItem('jsonwebtoken');
        setAuthenticationHeader(token);

        const updateDimension = () => {
            setScreenSize(getCurrentDimension())
        }
        window.addEventListener('resize', updateDimension);


        return (() => {
            window.removeEventListener('resize', updateDimension);
        })
    }, [screenSize])

    // ---------------function api calls------//

    useEffect(() => {
        getAllProject()
    }, [page, text, sort])

    const getAllProject = () => {
        dispatch(getAllData(page, limit, text, sort));
    }

    // ------------running status----------------------------//
    const handleStart = (id, proname) => {//proname added
        // let obj = {
        //     status: "Running"
        // }
        dispatch(updateProjectStatus(id, proname, page, limit, sort))// added sort and proname parameters,proname is added instead of obj
    }
    // ---------------------------closed status--------------------//
    const handleClose = (id, proname) => {//proname added
        // let obj = {
        //     status: "Closed"
        // }
        dispatch(updateProjectStatus(id, proname, page, limit, sort))// added sort and proname parameters,proname is added instead of obj
    }
    // -----------------------cancelled status---------------------//
    const handleCancel = (id, proname) => {//proname added
        // let obj = {
        //     status: "Cancelled"
        // }
        dispatch(updateProjectStatus(id, proname, page, limit, sort))// added sort and proname parameters, proname is added instead of obj
    }
    // --------------------------search function ---------------------//
    const handleSearch = (e) => {
        setText(e.target.value);
        getAllProject();
    }
    // ---------foe  large screen size sort function----------------//

    const handleSort = (e) => {
        setSort(e.target.value);
        getAllProject();
    }

    // ---------foe  small screen size sort function----------------//
    const handleSelect = (e) => {
        console.log(e.target.id)
        setSort(e.target.id);
        getAllProject();
    }

    const GetStartDate = ({ prostartdate }) => {
        const inputDate = new Date(prostartdate);
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        const formattedDate = inputDate.toLocaleDateString('en-US', options);
        return formattedDate;
    }

    const GetEndDate = ({ proenddate }) => {
        const inputDate = new Date(proenddate);
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        const formattedDate = inputDate.toLocaleDateString('en-US', options);
        return formattedDate;
    }

    return (
        <Box display={"flex"} flexDirection={{ sm: "column", md: "row", base: "column", lg: "row", xl: "row" }} gap={{ sm: "0px", base: "0px", md: "2px", lg: "2px", xl: "2px" }} justifyContent={"space-between"}>
            {screenSize.width > 640 ? <SideNavBar prop1={""} prop2={""} prop3={"5px solid #1b5cbf"} prop4={"20px"} prop5={""} prop6={""} src1={"/images/Dashboard.jpg"} src2={'/images/Project-list-active.jpg'} src3={'/images/create-project.jpg'} /> : null}
            <Box>
                <LogoComponent title={'Project Listing'} path={'/dashboard'} screenWidth={screenSize.width} />
                {/* overflow={"scroll"} height={"500px"}.......for following Box to avoid overlapping with pagination,make height responsive,and set limit as 10 for fetching project list */}
                    <Box width={{ sm: "94%", base: "94%", md: "92.5%", lg: "92.5%", xl: "92.5%" }} m={'auto'} borderRadius={'10px'} color={'gray'} position={{ sm: "", base: "", md: "absolute", lg: "absolute", xl: 'absolute' }} zIndex={{ sm: "", base: "", md: "100", lg: "100", xl: '100' }} top={{ sm: "0px", md: "12%", base: "0px", lg: '20%', xl: '20%' }} left={{ sm: "0px", md: "9%", base: "0px", lg: "6.2%", xl: "6.2%" }} backgroundColor={{ sm: "transparent", md: 'white', base: "transparent", lg: 'white', xl: 'white' }} boxShadow={{ sm: "0", base: "0", md: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px', lg: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px', xl: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px' }}>
                        <Box display={'flex'} p={{ sm: "20px 5px 10px 5px", base: "20px 5px 10px 5px", md: '20px 20px 10px 20px', lg: '20px 20px 10px 20px', xl: '20px 20px 10px 20px' }} justifyContent={'space-between'} width={'100%'} mt={{ sm: "20px", base: "20px", md: "0px", lg: "0px", xl: "0px" }}>
                            <Box display={'flex'} gap={"5px"} alignItems={'center'} borderBottom={'2px solid lightgray'} pb={{ sm: "5px", base: "5px" }} width={{ sm: "80%", base: "80%", lg: "20%", xl: "20%", md: "20%" }}>
                                <IoSearchOutline size={'20px'} />
                                <Input variant='unstyled' type='search' value={text} placeholder='Search' onChange={(e) => handleSearch(e)} />
                            </Box>
                            {
                                screenSize.width > 640 ?
                                    <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                                        <Box>Sort By :</Box>
                                        <Select variant='unstyled' fontWeight={'bold'} width={'110px'} value={sort} onChange={(e) => handleSort(e)}>
                                            <option value='pp.ppname'>Priority</option>{/*write col names of respective tables in value attribute */}
                                            <option value='pc.pcname'>Category</option>
                                            <option value='pl.plname'>Location</option>
                                            <option value='pdiv.pdivname'>Division</option>
                                            <option value='pd.pdname'>Department</option>
                                            <option value='pr.prname'>Reason</option>
                                            <option value='ps.psname'>Status</option>
                                        </Select>
                                    </Box>
                                    :
                                    // -----------------small screen hamburger------------//
                                    <Box>
                                        <Button backgroundColor={"transparent"} color={"gray.600"} onClick={onOpen}>
                                            <HamburgerIcon w={"8"} h={"12"} />
                                        </Button>
                                        <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
                                            <DrawerOverlay />
                                            <DrawerContent>
                                                <DrawerHeader borderBottomWidth='1px' display={"flex"} justifyContent={"space-between"}>
                                                    <Text fontWeight={"bold"} fontSize={"20px"}>Sort Projects By</Text>
                                                    <Box onClick={onClose}><CloseIcon fontWeight={"bold"} /></Box>
                                                </DrawerHeader>
                                                <DrawerBody lineHeight={"2.5"}>
                                                    <div id="pp.ppname" onClick={(e) => handleSelect(e)}>Priority</div>
                                                    <div id="pc.pcname" onClick={(e) => handleSelect(e)}>Category</div>
                                                    <div id="pl.plname" onClick={(e) => handleSelect(e)}>Location</div>
                                                    <div id="pdiv.pdivname" onClick={(e) => handleSelect(e)}>Division</div>
                                                    <div id="pd.pdname" onClick={(e) => handleSelect(e)}>Department</div>
                                                    <div id="pr.prname" onClick={(e) => handleSelect(e)}>Reason</div>
                                                    <div id="ps.psname" onClick={(e) => handleSelect(e)}>Status</div>
                                                </DrawerBody>
                                            </DrawerContent>
                                        </Drawer>
                                    </Box>

                            }
                        </Box>
                        {
                            screenSize.width > 640 ?
                                <TableContainer mt={'5px'} width={'100%'}>
                                    <Table variant='simple' >
                                        <Thead>
                                            <Tr backgroundColor={'#e9effd'}>
                                                <Th>Project Name</Th>
                                                <Th>Reason</Th>
                                                <Th>Type</Th>
                                                <Th>Division</Th>
                                                <Th>Category</Th>
                                                <Th>Priority</Th>
                                                <Th>Dept.</Th>
                                                <Th>Location</Th>
                                                <Th>Status</Th>
                                                <Th></Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {
                                                data?.map((el, index) => (
                                                    <Tr key={index} fontSize={'14px'}>
                                                        <Td>
                                                            <Text fontWeight={'bold'} color={'black'} fontSize={'16px'} wordBreak={'break-word'}>{el.proname}</Text>
                                                            <Text><GetStartDate prostartdate={el.prostartdate} /> to <GetEndDate proenddate={el.proenddate} /></Text>
                                                        </Td>
                                                        <Td fontWeight={'500'}>{el.prname}</Td>
                                                        <Td fontWeight={'500'}>{el.ptname}</Td>
                                                        <Td fontWeight={'500'}>{el.pdivname}</Td>
                                                        <Td fontWeight={'500'}>{el.pcname}</Td>
                                                        <Td fontWeight={'500'}>{el.ppname}</Td>
                                                        <Td fontWeight={'500'}>{el.pdname}</Td>
                                                        <Td fontWeight={'500'}>{el.plname}</Td>
                                                        <Td fontWeight={'bold'} color={'blue.700'} >{el.psname}</Td>
                                                        <Td display={'flex'} gap={'10px'}>
                                                            <button className='btn-start' onClick={() => handleStart(72, el.proname)}>Start</button>
                                                            <button className='btn-close' onClick={() => handleClose(73, el.proname)}>Close</button>
                                                            <button className='btn-cancel' onClick={() => handleCancel(74, el.proname)}>Cancel</button>
                                                        </Td>
                                                    </Tr>
                                                ))
                                            }
                                        </Tbody>

                                    </Table>
                                </TableContainer>
                                :
                                // ----------------small screen cards-------------------------//
                                <Box marginTop={"20px"}>
                                    {
                                        data?.map((el, index) => (
                                            <Card
                                                direction={{ base: 'column', sm: 'column' }}
                                                overflow='hidden'
                                                borderRadius={"15px"}
                                                variant='outline'
                                                width={"100%"}
                                                margin={"auto"}
                                                mb={"15px"}
                                                backgroundColor={"white"}
                                                padding={"20px"}
                                                key={index}
                                            >
                                                <Flex justifyContent={"space-between"} textAlign={"start"}>
                                                    <Box>
                                                        <Text fontWeight={"bold"} fontSize={"18px"}>{el.proname}</Text>
                                                        <Text fontSize={"16px"} color={"gray"}><GetStartDate prostartdate={el.prostartdate} /> to <GetEndDate proenddate={el.proenddate} /></Text>
                                                    </Box>
                                                    <Text fontWeight={"bold"} fontSize={"18px"} color={"blue.700"}>{el.status}</Text>
                                                </Flex>
                                                <Flex fontSize={"16px"} mt={"10px"}>
                                                    <Text color={"gray"}>Reason</Text>
                                                    <Text>: {el.prname}</Text>
                                                </Flex>
                                                <Flex fontSize={"16px"} mt={"2px"} gap={"5px"}>
                                                    <Flex>
                                                        <Text color={"gray"}>Type</Text>
                                                        <Text>: {el.ptname}</Text>
                                                    </Flex>
                                                    <Text color={"gray"}>•</Text>
                                                    <Flex>
                                                        <Text color={"gray"}>Category</Text>
                                                        <Text>: {el.pcname}</Text>
                                                    </Flex>
                                                </Flex>
                                                <Flex fontSize={"16px"} gap={"5px"} mt={"2px"}>
                                                    <Flex>
                                                        <Text color={"gray"}>Div</Text>
                                                        <Text>: {el.pdivname}</Text>
                                                    </Flex>
                                                    <Text color={"gray"}>•</Text>
                                                    <Flex>
                                                        <Text color={"gray"}>Dept</Text>
                                                        <Text>: {el.pdname}</Text>
                                                    </Flex>
                                                </Flex>
                                                <Flex fontSize={"16px"} mt={"2px"}>
                                                    <Text color={"gray"}>Location</Text>
                                                    <Text>: {el.plname}</Text>
                                                </Flex>
                                                <Flex fontSize={"16px"} mt={"2px"}>
                                                    <Text color={"gray"}>Priority</Text>
                                                    <Text>: {el.ppname}</Text>
                                                </Flex>
                                                <Flex fontSize={"16px"} mt={"2px"}>
                                                    <Text color={"gray"}>Priority</Text>
                                                    <Text fontWeight={'bold'} color={'blue.700'}>: {el.psname}</Text>
                                                </Flex>
                                                <Flex mt={"10px"} justifyContent={"space-between"}>
                                                    <button className='btn-start' onClick={() => handleStart(72, el.proname)}>Start</button>
                                                    <button className='btn-close' onClick={() => handleClose(73, el.proname)}>Close</button>
                                                    <button className='btn-cancel' onClick={() => handleCancel(74, el.proname)}>Cancel</button>
                                                </Flex>
                                            </Card>
                                        ))
                                    }
                                </Box>
                        }

                    </Box>
              
                <PaginationComponent totalPage={pageCount} page={page} onChange={(val) => setPage(val)} />
            </Box>
            {/* {screenSize.width > 640 ? "hello there" : null} */}
            {screenSize.width <= 640 ? <BottomNavbar prop1={""} prop2={""} prop3={"5px solid #1b5cbf"} prop4={"20px"} prop5={""} prop6={""} src1={"/images/Dashboard.jpg"} src2={'/images/Project-list-active.jpg'} src3={'/images/create-project.jpg'} /> : null}
        </Box>
    );
}

export default ProjectListComponent;