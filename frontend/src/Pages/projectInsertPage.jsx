import React, { useEffect, useState } from 'react';
import LogoComponent from '../Components/LogoComponent';
import { Box, Button, Input, Select, SimpleGrid, Text, Textarea } from '@chakra-ui/react';
import SideNavBar from '../Components/SideNavBar';
import '../styles/projectInsertPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { createNewProject } from '../Redux/project/Action';
import { useNavigate } from 'react-router-dom';
import BottomNavbar from '../Components/BottomNavbar';
import { getDropdownData } from '../Redux/project/Action';

const InsertProjectComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { dropdownObject } = useSelector(store => store.project);

    console.log(dropdownObject);
    const [formData, setFormData] = useState({
        theme: "",
        reason: "",
        type: "",
        division: "",
        category: "",
        priority: "",
        department: "",
        start_date: "",
        end_date: "",
        location: ""
    });


    // -------------------window-size------------------------//

    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    function getCurrentDimension() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension())
        }
        window.addEventListener('resize', updateDimension);


        return (() => {
            window.removeEventListener('resize', updateDimension);
        })
    }, [screenSize])

    useEffect(() => {
        dispatch(getDropdownData())// to fill data in all dropdowns
        console.log(dropdownObject);
    }, [])

    // --------------------function api calls------------------------------//

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let start = formData.start_date.split("-");
        let end = formData.end_date.split("-");
        let syear = +start[0];
        let smonth = +start[1];
        let sdate = +start[2];
        let eyear = +end[0];
        let emonth = +end[1];
        let edate = +end[2];
        if (syear > eyear) {
            setError("End year must be greater than or same as start year")
        }
        else if (syear <= eyear) {
            if (smonth > emonth && syear === eyear) {
                setError("End month must be greater than start month")
            }
            else {
                if (sdate > edate && syear === eyear && smonth === emonth) {
                    setError("End date must be greater than start date");
                }
                else {
                    console.log(formData);
                    dispatch(createNewProject(formData, navigate));
                }
            }
        }

    }


    return (
        <Box display={"flex"} flexDirection={{ sm: "column", md: "row", base: "column", lg: "row", xl: "row" }} gap={{ sm: "0px", base: "0px", md: "2px", lg: "2px", xl: "2px" }} justifyContent={"space-between"}>
            {screenSize.width > 640 ? <SideNavBar prop1={""} prop2={""} prop3={""} prop4={""} prop5={"5px solid #1b5cbf"} prop6={"20px"} src1={"/images/Dashboard.jpg"} src2={'/images/Project-list.jpg'} src3={'/images/create-project-active.jpg'} /> : null}
            <Box>
                <LogoComponent title={'Create Project'} path={'/project-listing'} screenWidth={screenSize.width} />
                {dropdownObject !== null ?
                    <Box width={{ sm: "95%", base: "95%", md: "89%", lg: "91.5%", xl: "91.5%" }} m={'auto'} mt={{ sm: "30px", md: "0px", base: "30px", lg: "0px", xl: "0px" }} p={'20px 20px 50px 20px'} borderRadius={'10px'} color={'gray'} position={{ sm: "", base: "", md: "absolute", lg: "absolute", xl: 'absolute' }} top={{ sm: "0px", md: "12.5%", base: "0px", lg: '20%', xl: '20%' }} backgroundColor={'white'} left={{ sm: "0px", md: "9.2%", base: "0px", lg: "6.5%", xl: "6.5%" }} zIndex={{ sm: "", base: "", md: "100", lg: "100", xl: '100' }} boxShadow={'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px'}>
                        <form>
                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                <Box width={'100%'} textAlign={"start"}>
                                    <Textarea
                                        placeholder='Enter Project Theme'
                                        size='sm'
                                        type="description"
                                        width={{ sm: "100%", md: "59%", base: "100%", lg: "59%", xl: "59%" }}
                                        borderRadius={'5px'}
                                        outlineColor={'gray.400'}
                                        border={'none'}
                                        _focus={{ outline: 'none' }}
                                        name="theme"
                                        value={formData.theme}
                                        onChange={(e) => handleChange(e)}
                                    />
                                    {formData.theme === "" ? <Text color={"red"}>Theme required</Text> : null}
                                </Box>

                                {screenSize.width > 640 ? <Button borderRadius={'50px'} p={'0px 40px'} backgroundColor={'#1b5cbf'} color={'lightgray'} _hover={{ backgroundColor: '#1b5cbf', color: 'lightgray' }} onClick={handleSubmit}>Save Project</Button> : null}
                            </Box>
                            <SimpleGrid columns={[1, 2, 2, 3]} spacing={{ sm: "20px", md: "40px", base: "20px", lg: "40px", xl: "40px" }} width={{ sm: "100%", md: "89%", base: "100%", lg: "89%", xl: "89%" }} mt={'50px'} textAlign={'start'}>
                                <Box>
                                    <label className='label-insert'>Reason</label>
                                    <Select placeholder='Select option' outlineColor={'gray.400'}
                                        border={'none'}
                                        mt={'5px'}
                                        _focus={{ outline: 'none' }}
                                        name="reason"
                                        value={formData.reason}
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {/* <option value={11}>For Buisness</option>
                                        <option value={12}>For Personal</option>
                                        <option value={13}>For Social</option>
                                        <option value={14}>For Dealership</option>
                                        <option value={15}>For Transport</option> */}

                                        {dropdownObject.reason.map((ele, index) => {
                                            return <option key={index} value={ele.prid}>For {ele.prname}</option>
                                        })}
                                    </Select>
                                </Box>
                                <Box>
                                    <label className='label-insert'>Type</label>
                                    <Select placeholder='Select option' outlineColor={'gray.400'}
                                        border={'none'}
                                        mt={'5px'}
                                        _focus={{ outline: 'none' }}
                                        name="type"
                                        value={formData.type}
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {/* <option value={101}>External</option>
                                        <option value={102}>Internal</option>
                                        <option value={103}>Both</option>
                                        <option value={104}>Vendor</option> */}

                                        {dropdownObject.type.map((ele, index) => {
                                            return <option key={index} value={ele.ptid}>{ele.ptname}</option>
                                        })}
                                    </Select>
                                </Box>
                                <Box>
                                    <label className='label-insert'>Division</label>
                                    <Select placeholder='Select option' outlineColor={'gray.400'}
                                        border={'none'}
                                        mt={'5px'}
                                        _focus={{ outline: 'none' }}
                                        name="division"
                                        value={formData.division}
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {/* <option value={41}>Filters</option>
                                        <option value={42}>Pumps</option>
                                        <option value={43}>Compressors</option>
                                        <option value={44}>Glass</option>
                                        <option value={45}>Water Heaters</option> */}

                                        {dropdownObject.division.map((ele, index) => {
                                            return <option key={index} value={ele.pdivid}>{ele.pdivname}</option>
                                        })}
                                    </Select>
                                </Box>
                                <Box>
                                    <label className='label-insert'>Category</label>
                                    <Select placeholder='Select option' outlineColor={'gray.400'}
                                        border={'none'}
                                        mt={'5px'}
                                        _focus={{ outline: 'none' }}
                                        name="category"
                                        value={formData.category}
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {/* <option value={31}>Quality A</option>
                                        <option value={32}>Quality B</option>
                                        <option value={33}>Quality C</option>
                                        <option value={34}>Quality D</option> */}

                                        {dropdownObject.category.map((ele, index) => {
                                            return <option key={index} value={ele.pcid}>{ele.pcname}</option>
                                        })}
                                    </Select>
                                </Box>
                                <Box>
                                    <label className='label-insert'>Priority</label>
                                    <Select placeholder='Select option' outlineColor={'gray.400'}
                                        border={'none'}
                                        mt={'5px'}
                                        _focus={{ outline: 'none' }}
                                        name="priority"
                                        value={formData.priority}
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {/* <option value={21}>High</option>
                                        <option value={22}>Low</option>
                                        <option value={23}>Medium</option> */}

                                        {dropdownObject.priority.map((ele, index) => {
                                            return <option key={index} value={ele.ppid}>{ele.ppname}</option>
                                        })}
                                    </Select>
                                </Box>
                                <Box>
                                    <label className='label-insert'>Department</label>
                                    <Select placeholder='Select option' outlineColor={'gray.400'}
                                        border={'none'}
                                        mt={'5px'}
                                        _focus={{ outline: 'none' }}
                                        name="department"
                                        value={formData.department}
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {/* <option value={61}>Strategy</option>
                                        <option value={62}>HR</option>
                                        <option value={63}>Financial</option>
                                        <option value={64}>Stores</option>
                                        <option value={65}>Maintenance</option>
                                        <option value={66}>Quality</option> */}

                                        {dropdownObject.department.map((ele, index) => {
                                            return <option key={index} value={ele.pdid}>{ele.pdname}</option>
                                        })}
                                    </Select>
                                </Box>
                                <Box>
                                    <label className='label-insert'>Start Date as per Project Plan</label>
                                    <Box>
                                        <Input type='date' placeholder='D month,Yr' outlineColor={'gray.400'}
                                            border={'none'}
                                            mt={'5px'}
                                            _focus={{ outline: 'none' }} name="start_date"
                                            value={formData.start_date} onChange={(e) => handleChange(e)} />
                                        {formData.start_date === "" ? <Text color={"red"} fontSize={"14px"}>Start Date Require</Text> : null}
                                    </Box>
                                </Box>
                                <Box>
                                    <label className='label-insert'>End Date as per Project Plan</label>
                                    <Box>
                                        <Input type='date' placeholder='D month,Yr' outlineColor={'gray.400'}
                                            border={'none'}
                                            mt={'5px'}
                                            _focus={{ outline: 'none' }}
                                            name="end_date"
                                            value={formData.end_date} onChange={(e) => handleChange(e)} />
                                        {formData.end_date === "" ? <Text color={"red"} fontSize={"14px"}>End Date Require</Text> : null}
                                        {error !== "" ? <Text color={"red"} fontSize={"14px"}>{error}</Text> : null}
                                    </Box>
                                </Box>
                                <Box>
                                    <label className='label-insert'>Location</label>
                                    <Select placeholder='Select option' outlineColor={'gray.400'}
                                        border={'none'}
                                        mt={'5px'}
                                        _focus={{ outline: 'none' }}
                                        name="location"
                                        value={formData.location}
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {/* <option value={51}>Pune</option>
                                        <option value={52}>Delhi</option>
                                        <option value={53}>Bangalore</option>
                                        <option value={54}>Mumbai</option> */}

                                        {dropdownObject.location.map((ele, index) => {
                                            return <option key={index} value={ele.plid}>{ele.plname}</option>
                                        })}
                                    </Select>
                                </Box>

                            </SimpleGrid>
                            <br />
                            <Box display={'flex'} gap={'10px'} justifyContent={{ sm: "left", md: "right", base: "left", lg: "right", xl: "right" }} mr={{ sm: "0px", md: '100px', base: "0px", lg: '385px', xl: '385px' }}>
                                <Text>Status :</Text>
                                <Text fontWeight={'bold'} color={'blackAlpha.700'}>Registered</Text>
                            </Box>

                            {screenSize.width <= 640 ? <Button width={"100%"} mt={"20px"} borderRadius={'50px'} p={'0px 40px'} backgroundColor={'#1b5cbf'} color={'lightgray'} _hover={{ backgroundColor: '#1b5cbf', color: 'lightgray' }} onClick={handleSubmit}>Save Project</Button> : null}
                        </form>
                    </Box> : null}
            </Box>
            {screenSize.width <= 640 ? <BottomNavbar prop1={""} prop2={""} prop3={""} prop4={""} prop5={"5px solid #1b5cbf"} prop6={"20px"} src1={"/images/Dashboard.jpg"} src2={'/images/Project-list.jpg'} src3={'/images/create-project-active.jpg'} /> : null}
        </Box>
    );
};

export default InsertProjectComponent;